import sharp from 'sharp';
import getImageBufferFromUrl from '../getImageBufferFromUrl/get-image-buffer-from-url';

const optimizer = async (imageUri: string) => {
  if (!imageUri) return;

  let image;
  if (imageUri.startsWith('http')) {
    image = await getImageBufferFromUrl(imageUri);
  } else {
    image = new Buffer(imageUri.split(',')[1], 'base64');
  }

  const result = await sharp(image)
    .avif({ quality: 80, force: false })
    .jpeg({ quality: 80, progressive: true, force: false })
    .png({ quality: 80, progressive: true, force: false })
    .webp({ quality: 80, force: false });

  return {
    buffer: result.toBuffer(),
    bytes: 9999999999,
  };
};

export default optimizer;
