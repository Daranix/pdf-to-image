# PDF-TO-IMAGE
A simple library to convert any PDF into a image


## Requirements:

- ✅ Node.js >= 16 OR any modern Browser with support for WASM (https://caniuse.com/wasm)

## Features

- 🔀 Multiple output formats (PNG, JPEG, BMP, GIF, TIFF)
- Install&Go 🚀🚀  doesn't require any extra binaries to be installed on your system.


## 📚 Usage Example:

Node.js

```javascript
import { IMG_ALLOWED_FORMATS, convertDocumentToImage } from 'pdf-to-image';


const pdfFile = fs.readFileSync('./sample.pdf');
const result = await convertDocumentToImage(pdfFile, 'PNG');
fs.writeFileSync('out.png', result);
```

Browser:

```javascript
```