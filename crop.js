const { Jimp } = require('jimp');

async function cropIcon() {
  try {
    const image = await Jimp.read('src/app/icon.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // The logo "H" is roughly in the top 55% of the image.
    // We will crop a square from the top middle.
    const cropSize = Math.floor(width * 0.55); 
    const x = Math.floor((width - cropSize) / 2);
    const y = Math.floor(height * 0.12); // start 12% from top
    
    image.crop({ x, y, w: cropSize, h: cropSize });
    await image.write('src/app/icon.png');
    console.log('Cropped successfully');
  } catch (error) {
    console.error('Error cropping image:', error);
  }
}

cropIcon();
