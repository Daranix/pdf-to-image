
import { ImageMagick, Magick, MagickFormat, initializeImageMagick } from '@imagemagick/magick-wasm';
// @ts-ignore
import * as mupdf from 'mupdf';



export const IMG_ALLOWED_FORMATS = [
    `${MagickFormat.Jpeg}`,
    `${MagickFormat.Png}`,
    `${MagickFormat.Bmp}`,
    //`${MagickFormat.Webp}`,
    //`${MagickFormat.Avif}`, 
    //`${MagickFormat.Apng}`, 
    `${MagickFormat.Gif}`,
    `${MagickFormat.Tiff}`,
    //`${MagickFormat.Ico}`
] as const

export type ImageFormat = typeof IMG_ALLOWED_FORMATS[number];

const DEFAULT_DPI = 250;


export async function convertDocumentToImage(pdfFile: Uint8Array, format: ImageFormat, dpi = DEFAULT_DPI): Promise<Array<Uint8Array>> {
    const doc = mupdf.Document.openDocument(pdfFile, "application/pdf")

    const pagesConverted: Array<Promise<Uint8Array>> = [];
    for(let i = 0; i < doc.countPages(); i++) {
        const page = doc.loadPage(i);
        pagesConverted.push(convertPage(page, format, dpi));
    }

    const result = await Promise.all(pagesConverted);
    return result;
}

export async function convertDocumentPageToImage(pdfFile: Uint8Array, pageNumber: number, format: ImageFormat, dpi = DEFAULT_DPI): Promise<Uint8Array> {
    const doc = mupdf.Document.openDocument(pdfFile, "application/pdf")
    const page = doc.loadPage(pageNumber);
    return convertPage(page, format, dpi);
}

async function convertPage(page: mupdf.PDFPage, format: ImageFormat, dpi = DEFAULT_DPI): Promise<Uint8Array> {

    const matrix = mupdf.Matrix.scale(dpi/72, dpi/72);
    const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);
    const baseBuffer = pixmap.asPNG();

    if(!IMG_ALLOWED_FORMATS.includes(format)) {
        throw new Error(`Invalid format specified`)
    }

    if(format === 'PNG') {
        return baseBuffer
    } else {
        return await convertToFormat(baseBuffer, format);
    }
}



function convertToFormat(buffer: Uint8Array, format: ImageFormat): Promise<Uint8Array> {
    return new Promise(async (resolve, reject) => {
        await initializeImageMagick('./node_modules/@imagemagick/magick-wasm/dist/magick.wasm');
        ImageMagick.read(buffer, (img) => {
            img.quality = 50;
            const magickFormat = getMagickFormat(format);
            img.write(magickFormat, (d) => {
                resolve(d);
            });
        });
    });

}

function getMagickFormat(format: ImageFormat) {
    const values = Object.values(MagickFormat);
    return values.find((v) => v === format);
}