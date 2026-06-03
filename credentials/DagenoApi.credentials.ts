import {
	IAuthenticateGeneric,
	ICredentialType,
	ICredentialTestRequest,
	INodeProperties,
} from 'n8n-workflow';

export class DagenoApi implements ICredentialType {
	name = 'dagenoApi';
	displayName = 'Dageno API';
	documentationUrl = 'https://open-api-docs.dageno.ai/';
	icon = 'file:dageno.png' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	// The test method used by n8n to verify if the credentials are valid
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://api.dageno.ai/business/api/v1/open-api/brand',
			// We must include the header here too for the test request to work
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
