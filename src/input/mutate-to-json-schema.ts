function mutateInputObjectToJsonSchema(obj: any) {
    if (!('properties' in obj)) return;

    for (const key in obj['properties']) {
        if (obj['properties'][key].type === 'object') {
            mutateInputObjectToJsonSchema(obj['properties'][key]);
        }
        if (obj['properties'][key].type === 'array') {
            mutateInputArrayToJsonSchema(obj['properties'][key]);
        }
    }
}

function mutateInputArrayToJsonSchema(obj: any) {
    obj.type = 'array';
    if ('items' in obj) {
        if (obj['items'].type === 'object') {
            mutateInputObjectToJsonSchema(obj['items']);
        }
        return;
    }
    if (!('editor' in obj)) return;
    if (obj['editor'] === 'json') return;
    if (obj['editor'] === 'stringList') {
        obj['items'] = {
            type: 'string',
        };
        return;
    }
    if (obj['editor'] === 'requestListSources') {
        obj['items'] = {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                },
                method: {
                    type: 'string',
                },
                payload: {
                    type: 'string',
                },
                userData: {
                    type: 'object',
                },
                headers: {
                    type: 'object',
                },
            },
        };
    }
    return;
}

export const mutateInputSchemaToJsonSchema = mutateInputObjectToJsonSchema;
