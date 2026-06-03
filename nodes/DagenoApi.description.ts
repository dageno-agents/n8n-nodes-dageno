import {
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

export const dagenoApiDescription: INodeTypeDescription = {
	displayName: 'Dageno API',
	name: 'dagenoApi',
	icon: 'file:dageno.png',
	group: ['transform'],
	version: 1,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with Dageno API for GEO analysis and insights',
	defaults: {
		name: 'Dageno API',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
	credentials: [
		{
			name: 'dagenoApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{
					name: 'Brand',
					value: 'brand',
				},
				{
					name: 'Citation',
					value: 'citation',
				},
				{
					name: 'GEO Analysis',
					value: 'geoAnalysis',
				},
				{
					name: 'Opportunity',
					value: 'opportunity',
				},
				{
					name: 'Prompt',
					value: 'prompt',
				},
				{
					name: 'Topic',
					value: 'topic',
				},
			],
			default: 'brand',
		},
		// Operations
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['brand'],
				},
			},
			options: [
				{
					name: 'Get Brand Info',
					value: 'get',
					action: 'Get brand base information',
				},
			],
			default: 'get',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['geoAnalysis'],
				},
			},
			options: [
				{
					name: 'Execute Query',
					value: 'execute',
					action: 'Execute GEO analysis query',
				},
			],
			default: 'execute',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['opportunity'],
				},
			},
			options: [
				{
					name: 'List Content Opportunity',
					value: 'content',
					action: 'List content opportunity',
				},
				{
					name: 'List Backlink Opportunity',
					value: 'backlink',
					action: 'List backlink opportunity',
				},
				{
					name: 'List Community Opportunity',
					value: 'community',
					action: 'List community opportunity',
				},
			],
			default: 'content',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['topic'],
				},
			},
			options: [
				{
					name: 'List Topic',
					value: 'list',
					action: 'List topic',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['prompt'],
				},
			},
			options: [
				{
					name: 'List Prompt',
					value: 'list',
					action: 'List prompt',
				},
				{
					name: 'List Prompt Response',
					value: 'listResponses',
					action: 'List prompt response',
				},
				{
					name: 'Get Response Detail',
					value: 'getResponseDetail',
					action: 'Get response detail by prompt',
				},
			],
			default: 'list',
		},
		{
			displayName: 'Operation',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: {
				show: {
					resource: ['citation'],
				},
			},
			options: [
				{
					name: 'List Domains',
					value: 'listDomains',
					action: 'List citation domains',
				},
				{
					name: 'List URLs',
					value: 'listUrls',
					action: 'List citation URLs',
				},
				{
					name: 'List Domains by Prompt',
					value: 'listDomainsByPrompt',
					action: 'List citation domains by prompt',
				},
				{
					name: 'List URLs by Prompt',
					value: 'listUrlsByPrompt',
					action: 'List citation URLs by prompt',
				},
			],
			default: 'listDomains',
		},
		// Parameters
		{
			displayName: 'Body (JSON)',
			name: 'body',
			type: 'json',
			displayOptions: {
				show: {
					resource: ['geoAnalysis'],
					operation: ['execute'],
				},
			},
			default: '{\n  "target": {\n    "entity": "topic",\n    "metrics": ["visibility", "citation"],\n    "filters": {\n      "dateRange": {\n        "startAt": "2026-03-18T00:00:00.000Z",\n        "endAt": "2026-03-28T00:00:00.000Z"\n      }\n    }\n  },\n  "analysis": {\n    "type": "ranking",\n    "ranking": {\n      "orderBy": "visibility",\n      "direction": "DESC"\n    }\n  }\n}',
			required: true,
			description: 'The DSL query body for GEO analysis',
		},
		{
			displayName: 'Prompt ID',
			name: 'promptId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompt', 'citation'],
					operation: ['listResponses', 'getResponseDetail', 'listDomainsByPrompt', 'listUrlsByPrompt'],
				},
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Response ID',
			name: 'responseId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompt'],
					operation: ['getResponseDetail'],
				},
			},
			default: '',
			required: true,
		},
		// Pagination and Filters (Added for GET requests based on 400 error)
		{
			displayName: 'Page',
			name: 'page',
			type: 'number',
			displayOptions: {
				show: {
					resource: ['opportunity', 'topic', 'prompt', 'citation'],
				},
			},
			default: 1,
			description: 'The page number to retrieve',
		},
		{
			displayName: 'Page Size',
			name: 'pageSize',
			type: 'number',
			displayOptions: {
				show: {
					resource: ['opportunity', 'topic', 'prompt', 'citation'],
				},
			},
			default: 20,
			description: 'The number of results per page',
		},
		{
			displayName: 'Start Date',
			name: 'startAt',
			type: 'dateTime',
			displayOptions: {
				show: {
					resource: ['opportunity', 'topic', 'prompt', 'citation'],
				},
			},
			default: '={{new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()}}',
			description: 'Filter results starting from this date',
		},
		{
			displayName: 'End Date',
			name: 'endAt',
			type: 'dateTime',
			displayOptions: {
				show: {
					resource: ['opportunity', 'topic', 'prompt', 'citation'],
				},
			},
			default: '={{new Date().toISOString()}}',
			description: 'Filter results ending at this date',
		},
	],
};
