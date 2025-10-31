import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

import { generateDatasetTypes } from './index.ts';

const emptySchema = `
export interface Dataset {
  [k: string]: unknown;
}
`;

describe('generateDatasetTypes', async () => {
    it('should generate { [k: string]: unknown } type for empty schema', async () => {
        const schema = {};
        const types = await generateDatasetTypes(schema);
        expect(types).toContain(emptySchema);
    });
    it('should produce a known good output based on a known input', async () => {
        const goldenInput = readFileSync('./fixtures/dataset.json', 'utf-8');
        const goldenOutput = readFileSync('./fixtures/dataset.ts', 'utf-8');
        const fullGeneratedSchema = await generateDatasetTypes(JSON.parse(goldenInput));
        expect(fullGeneratedSchema).toEqual(goldenOutput);
    });
});
