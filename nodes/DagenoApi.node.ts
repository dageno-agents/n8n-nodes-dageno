import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

import {
	dagenoApiDescription,
} from './DagenoApi.description';

export class DagenoApi implements INodeType {
	description: INodeTypeDescription = dagenoApiDescription;

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				const headers = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				};

				let method: IHttpRequestMethods = 'GET';
				let url = 'https://api.dageno.ai/business/api/v1/open-api';
				let body: IDataObject | undefined;
				const qs: IDataObject = {};

				// Helper to add pagination and filters to query string for list endpoints
				const addListParams = () => {
					qs.page = this.getNodeParameter('page', i) as number;
					qs.pageSize = this.getNodeParameter('pageSize', i) as number;
					qs.startAt = this.getNodeParameter('startAt', i) as string;
					qs.endAt = this.getNodeParameter('endAt', i) as string;
				};

				const getJsonBody = (parameterName: string) => {
					const bodyInput = this.getNodeParameter(parameterName, i) as string | IDataObject;

					if (typeof bodyInput !== 'string') {
						return bodyInput;
					}

					try {
						return JSON.parse(bodyInput) as IDataObject;
					} catch (e) {
						throw new NodeApiError(this.getNode(), {
							message: `Invalid JSON format in ${parameterName} parameter. Please provide a valid JSON object.`,
						} as JsonObject);
					}
				};

				const getCommaSeparatedList = (parameterName: string) => {
					const value = this.getNodeParameter(parameterName, i, '') as string;

					return value
						.split(',')
						.map((entry) => entry.trim())
						.filter((entry) => entry.length > 0);
				};

				if (resource === 'brand') {
					url += '/brand';
				} else if (resource === 'geoAnalysis') {
					method = 'POST';
					url += '/geo/analysis';
					body = getJsonBody('body');
				} else if (resource === 'keyword') {
					method = 'POST';
					url += '/keywords/volume';
					body = {
						keywords: getCommaSeparatedList('keywords'),
					};
				} else if (resource === 'opportunity') {
					url += `/opportunities/${operation}`;
					addListParams();
				} else if (resource === 'topic') {
					url += '/topics';
					addListParams();
				} else if (resource === 'prompt') {
					if (operation === 'list') {
						url += '/prompts';
						addListParams();
					} else if (operation === 'listResponses') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/prompts/${promptId}/responses`;
						addListParams();
					} else if (operation === 'getResponseDetail') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						const responseId = this.getNodeParameter('responseId', i) as string;
						url += `/prompts/${promptId}/responses/${responseId}`;
					} else if (operation === 'listQueryFanout') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/prompts/${promptId}/query_fanout`;
						addListParams();
						const platforms = getCommaSeparatedList('platforms');
						const regions = getCommaSeparatedList('regions');

						if (platforms.length > 0) {
							qs.platforms = platforms.join(',');
						}

						if (regions.length > 0) {
							qs.regions = regions.join(',');
						}
					} else if (operation === 'batchCreate') {
						method = 'POST';
						url += '/prompts/batch/create';
						body = getJsonBody('batchBody');
					} else if (operation === 'batchDelete') {
						method = 'POST';
						url += '/prompts/batch/delete';
						body = getJsonBody('batchBody');
					} else if (operation === 'batchGet') {
						method = 'POST';
						url += '/prompts/batch/get';
						body = getJsonBody('batchBody');
					} else if (operation === 'batchUpdate') {
						method = 'POST';
						url += '/prompts/batch/update';
						body = getJsonBody('batchBody');
					}
				} else if (resource === 'citation') {
					if (operation === 'listDomains') {
						url += '/citations/domains';
						addListParams();
					} else if (operation === 'listUrls') {
						url += '/citations/urls';
						addListParams();
					} else if (operation === 'listDomainsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/domains`;
						qs.promptId = promptId;
						addListParams();
					} else if (operation === 'listUrlsByPrompt') {
						const promptId = this.getNodeParameter('promptId', i) as string;
						url += `/citations/urls`;
						qs.promptId = promptId;
						addListParams();
					}
				} else if (resource === 'seo') {
					url += '/seo/traffic';
					qs.domain = this.getNodeParameter('domain', i) as string;
				}

				const options = {
					method,
					url,
					headers,
					qs,
					body,
					json: true,
				};

				try {
					responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'dagenoApi', options);
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

				if (responseData.error) {
					throw new NodeApiError(this.getNode(), responseData as JsonObject);
				}

				const data = responseData.data || responseData;

				if (Array.isArray(data)) {
					for (const entry of data) {
						returnData.push({ json: entry as IDataObject });
					}
				} else if (data.items && Array.isArray(data.items)) {
					for (const entry of data.items) {
						returnData.push({ json: entry as IDataObject });
					}
				} else {
					returnData.push({ json: data as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const message = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ json: { error: message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
