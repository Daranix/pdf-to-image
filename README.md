# PDF-TO-IMAGE
A simple library to convert any PDF into a image on Node.js


## Requirements:

- ✅ Node.js >= 16

## Features

- 🔀 Multiple output formats (PNG, JPEG, BMP, GIF, TIFF)
- Install&Go 🚀🚀  doesn't require any extra binaries to be installed/build on your system.


## 📚 Usage Example:

Node.js

```javascript
import { IMG_ALLOWED_FORMATS, convertDocumentToImage } from 'pdf-to-image';


const pdfFile = fs.readFileSync('./sample.pdf');
const result = await convertDocumentToImage(pdfFile, 'PNG');
fs.writeFileSync('out.png', result);
```