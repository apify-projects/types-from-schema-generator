import { compile } from 'json-schema-to-typescript';

import { BANNER_COMMENT } from '../constants.ts';
import { mutateInputSchemaToJsonSchema } from './mutate-to-json-schema.ts';

export async function generateInputTypes(schema: any, name: string = 'input') {
    const inputSchema = structuredClone(schema);
    mutateInputSchemaToJsonSchema(inputSchema);
    return await compile(inputSchema, name, {
        bannerComment: BANNER_COMMENT,
        maxItems: -1,
        unknownAny: true,
        $refOptions: { resolve: { external: false, file: false, http: false } },
    });
}
