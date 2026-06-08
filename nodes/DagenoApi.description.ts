import {
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

const listOperations = [
	'list',
	'listDomains',
	'listDomainsByPrompt',
	'listQueryFanout',
	'listResponses',
	'listUrls',
	'listUrlsByPrompt',
];

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
					name: 'Keyword',
					value: 'keyword',
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
					name: 'SEO',
					value: 'seo',
				},
				{
					name: 'Topic',
					value: 'topic',
				},
			],
			default: 'brand',
		},
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
					name: 'List Domains by Prompt',
					value: 'listDomainsByPrompt',
					action: 'List citation domains by prompt',
				},
				{
					name: 'List URLs',
					value: 'listUrls',
					action: 'List citation URLs',
				},
				{
					name: 'List URLs by Prompt',
					value: 'listUrlsByPrompt',
					action: 'List citation URLs by prompt',
				},
			],
			default: 'listDomains',
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
					resource: ['keyword'],
				},
			},
			options: [
				{
					name: 'Get Keyword Volume',
					value: 'getVolume',
					action: 'Get keyword volume',
				},
			],
			default: 'getVolume',
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
					name: 'List Backlink Opportunity',
					value: 'backlink',
					action: 'List backlink opportunity',
				},
				{
					name: 'List Community Opportunity',
					value: 'community',
					action: 'List community opportunity',
				},
				{
					name: 'List Content Opportunity',
					value: 'content',
					action: 'List content opportunity',
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
					resource: ['prompt'],
				},
			},
			options: [
				{
					name: 'Batch Create Prompt',
					value: 'batchCreate',
					action: 'Batch create prompt',
				},
				{
					name: 'Batch Delete Prompt',
					value: 'batchDelete',
					action: 'Batch delete prompt',
				},
				{
					name: 'Batch Get Prompt',
					value: 'batchGet',
					action: 'Batch get prompt',
				},
				{
					name: 'Batch Update Prompt',
					value: 'batchUpdate',
					action: 'Batch update prompt',
				},
				{
					name: 'Get Response Detail',
					value: 'getResponseDetail',
					action: 'Get response detail by prompt',
				},
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
					name: 'List Query Fanout',
					value: 'listQueryFanout',
					action: 'List query fanout by prompt',
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
					resource: ['seo'],
				},
			},
			options: [
				{
					name: 'Get Traffic Data',
					value: 'getTraffic',
					action: 'Get SEO traffic data',
				},
			],
			default: 'getTraffic',
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
			displayName: 'Keywords',
			name: 'keywords',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['keyword'],
					operation: ['getVolume'],
				},
			},
			default: '',
			placeholder: 'marketing teams, content marketing',
			required: true,
			description: 'Comma-separated keyword list',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['seo'],
					operation: ['getTraffic'],
				},
			},
			default: '',
			placeholder: 'example.com',
			required: true,
			description: 'Domain to retrieve SEO traffic data for',
		},
		{
			displayName: 'Batch Body (JSON)',
			name: 'batchBody',
			type: 'json',
			displayOptions: {
				show: {
					resource: ['prompt'],
					operation: ['batchCreate', 'batchDelete', 'batchGet', 'batchUpdate'],
				},
			},
			default: '{\n  "items": []\n}',
			required: true,
			description: 'Batch request body as JSON. Use items for create/update and ids for get/delete.',
		},
		{
			displayName: 'Prompt ID',
			name: 'promptId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompt', 'citation'],
					operation: [
						'getResponseDetail',
						'listDomainsByPrompt',
						'listQueryFanout',
						'listResponses',
						'listUrlsByPrompt',
					],
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
		{
			displayName: 'Platforms',
			name: 'platforms',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompt'],
					operation: ['listQueryFanout'],
				},
			},
			default: '',
			placeholder: 'chatgpt, perplexity',
			description: 'Optional comma-separated platform filter',
		},
		{
			displayName: 'Regions',
			name: 'regions',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['prompt'],
					operation: ['listQueryFanout'],
				},
			},
			default: '',
			placeholder: 'US, GB',
			description: 'Optional comma-separated region filter',
		},
		{
			displayName: 'Page',
			name: 'page',
			type: 'number',
			displayOptions: {
				show: {
					resource: ['citation', 'opportunity', 'prompt', 'topic'],
					operation: listOperations,
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
					resource: ['citation', 'opportunity', 'prompt', 'topic'],
					operation: listOperations,
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
					resource: ['citation', 'opportunity', 'prompt', 'topic'],
					operation: listOperations,
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
					resource: ['citation', 'opportunity', 'prompt', 'topic'],
					operation: listOperations,
				},
			},
			default: '={{new Date().toISOString()}}',
			description: 'Filter results ending at this date',
		},
	],
};
