import { compile } from 'json-schema-to-typescript';
import { BANNER_COMMENT } from '../constants.ts';

export async function generateDatasetTypes(schema: any, name: string = 'dataset') {
    const fields = schema?.fields ?? {};
    return await compile(fields, name, {
        bannerComment: BANNER_COMMENT,
        maxItems: -1,
        unknownAny: true,
        $refOptions: { resolve: { external: false, file: false, http: false } },
    });
}
