# n8n-nodes-dageno-ai

This is an n8n community node to interact with the [Dageno Open API](https://open-api-docs.dageno.ai/).

[Dageno](https://dageno.ai/) is a GEO (Generative Engine Optimization) analysis tool that helps you understand how AI search engines perceive your brand and identify opportunities for optimization.

## Features

- **Brand**: Get basic information about your brand.
- **GEO Analysis**: Execute complex GEO analysis queries to see how AI engines respond to your brand.
- **Keyword**: Get keyword volume, CPC, competition, and trend data.
- **Opportunities**: Discover content, backlink, and community opportunities.
- **SEO**: Get traffic and ranking data for a domain.
- **Topics & Prompts**: List and manage topics and prompts used in your analysis, including batch prompt operations.
- **Citations**: Track citation domains and URLs across AI search engine responses.

## Installation

To install this node in your n8n instance:

1. Go to **Settings > Community Nodes**.
2. Click **Install a community node**.
3. Enter `n8n-nodes-dageno-ai` as the package name.
4. Click **Install**.

## Release Process

1. Bump `package.json` version to the next published version.
2. Create a matching Git tag in GitHub (for example `v1.2.7`).
3. Publish through the GitHub Actions workflow with npm provenance enabled.

## Credentials

To use this node, you need a Dageno API Key. You can obtain it from your Dageno dashboard.

1. Create a new credential in n8n.
2. Select **Dageno API**.
3. Enter your `x-api-key`.

## Resources & Operations

### Brand
- **Get**: Retrieve basic brand information.

### GEO Analysis
- **Execute**: Run a GEO analysis query by providing a JSON body.

### Keyword
- **Get Keyword Volume**: Retrieve volume, CPC, competition, and trend data for keywords.

### Opportunities
- **List**: Retrieve opportunities for Content, Backlinks, or Community.

### Topics
- **List**: Get a list of all topics.

### Prompts
- **List**: Get a list of all prompts.
- **List Responses**: Get responses for a specific prompt.
- **Get Response Detail**: Get detailed information for a specific response.
- **List Query Fanout**: Get query fanout data for a specific prompt.
- **Batch Create**: Create prompts in bulk.
- **Batch Delete**: Delete prompts in bulk.
- **Batch Get**: Retrieve prompts in bulk.
- **Batch Update**: Update prompts in bulk.

### SEO
- **Get Traffic Data**: Retrieve SEO traffic, rank, country, source, and keyword data for a domain.

### Citations
- **List Domains**: Get a list of citation domains.
- **List URLs**: Get a list of citation URLs.

## License

[MIT](LICENSE)
