import { hash } from 'crypto';
import { readFileSync, writeFileSync } from 'fs';

import { generateDatasetTypes } from './dataset/index.ts';
import { generateInputTypes } from './input/index.ts';
import { removeBlockComments } from './comments.ts';
import { isTsWithoutCommentsEqual } from './compare.ts';

async function generateTypesFromInputSchema(path: string, mode: 'generate' | 'verify' = 'verify') {
    const inputSchema = JSON.parse(readFileSync(path, 'utf-8'));
    const types = await generateInputTypes(inputSchema, path.replace('.json', ''));
    if (mode === 'generate') {
        writeFileSync(path.replace('.json', '.ts'), types);
        process.exit(0);
    }
    // verify
    const previousTypes = readFileSync(path.replace('.json', '.ts'), 'utf-8');
    const doTypesMatch = isTsWithoutCommentsEqual(previousTypes, types);
    if (!doTypesMatch) {
        console.log(
            "Input schema changed, did you forget to generate types?\nIf you didn't forget, please ensure that there is no linter or formatter modifying the file.",
        );
        process.exit(1);
    }
}

async function generateTypesFromDatasetSchema(path: string, mode: 'generate' | 'verify' = 'verify') {
    const datasetSchema = JSON.parse(readFileSync(path, 'utf-8'));
    const types = await generateDatasetTypes(datasetSchema, path.replace('.json', ''));

    if (mode === 'generate') {
        writeFileSync(path.replace('.json', '.ts'), types);
        process.exit(0);
    }
    // verify
    const previousTypes = readFileSync(path.replace('.json', '.ts'), 'utf-8');
    const doTypesMatch = isTsWithoutCommentsEqual(previousTypes, types);
    if (!doTypesMatch) {
        console.log(
            "Dataset schema changed, did you forget to generate types?\nIf you didn't forget, please ensure that there is no linter or formatter modifying the file.",
        );
        process.exit(1);
    }
}
await generateTypesFromDatasetSchema('./fixtures/dataset.json', 'generate');
// await generateTypesFromInputSchema('./src/dataset-schema/input_schema.json', 'generate');
