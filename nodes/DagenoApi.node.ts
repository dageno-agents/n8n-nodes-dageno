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

				if (resource === 'brand') {
					url += '/brand';
				} else if (resource === 'geoAnalysis') {
					method = 'POST';
					url += '/geo/analysis';
					const bodyInput = this.getNodeParameter('body', i) as string | IDataObject;
					if (typeof bodyInput === 'string') {
						try {
							body = JSON.parse(bodyInput);
						} catch (e) {
							throw new NodeApiError(this.getNode(), {
								message: 'Invalid JSON format in Body parameter. Please provide a valid JSON object.',
							} as JsonObject);
						}
					} else {
						body = bodyInput;
					}
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
