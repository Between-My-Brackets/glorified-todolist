import * as fs from 'fs';

const swagger = JSON.parse(fs.readFileSync('swagger.json', 'utf-8'));

const canonicalSchema = {
  base_url: swagger.servers[0].url,
  endpoints: [],
};

for (const path in swagger.paths) {
  for (const method in swagger.paths[path]) {
    const endpoint = swagger.paths[path][method];
    const schema_def = endpoint.requestBody?.content['application/json']?.schema;
    let schema = {};
    if(schema_def?.['$ref']){
        const schemaName = schema_def['$ref'].split('/').pop();
        schema = swagger.components.schemas[schemaName].properties;
    }
    else if(schema_def){
        schema = schema_def;
    }


    canonicalSchema.endpoints.push({
      path: path,
      method: method.toUpperCase(),
      operation_id: endpoint.operationId || null,
      auth: endpoint.security ? (endpoint.security[0].bearerAuth ? 'bearer' : (endpoint.security[0].apiKeyAuth ? 'apiKey' : 'oauth2')) : 'none',
      request: {
        content_type: endpoint.requestBody ? 'application/json' : '',
        schema: schema,
        required: endpoint.requestBody?.content['application/json']?.schema?.required || [],
      },
      responses: Object.keys(endpoint.responses).reduce((acc, status) => {
        acc[status] = {
          description: endpoint.responses[status].description,
          content_type: endpoint.responses[status].content ? 'application/json' : '',
        };
        return acc;
      }, {}),
    });
  }
}

fs.writeFileSync('canonical_schema.json', JSON.stringify(canonicalSchema, null, 2));
