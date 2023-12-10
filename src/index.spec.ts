import { IMG_ALLOWED_FORMATS, convertDocumentToImage } from '.';
import * as fs from 'fs';

describe('Test conversion from PDF to Image formats', () => {

    const formats = IMG_ALLOWED_FORMATS;
    const pdfFile = fs.readFileSync('./sample.pdf');

    for (const format of formats) {
        test(`Should be able to convert from PDF to ${format}`, async () => {
            const result = await convertDocumentToImage(pdfFile, format);
            expect(result.length).toStrictEqual(2);

            for(let i = 0; i < result.length; i++) {
                const buffer = result[i];
                expect(buffer).toBeInstanceOf(Uint8Array);
                fs.writeFileSync(`out/out-${i+1}.${format}`, buffer);
            }
        });
    }

});