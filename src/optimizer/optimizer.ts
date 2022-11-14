import sharp from 'sharp';
import getImageBufferFromUrl from '../get-image-buffer-from-url/get-image-buffer-from-url';
import validator from '../validator/validator';

const optimizer = async (imageUri: string) => {
  if (!imageUri) return;

  if (!validator(imageUri)) throw new Error('invalid request');

  let image;
  if (imageUri.startsWith('http')) {
    image = await getImageBufferFromUrl(imageUri);
  } else {
    image = Buffer.from(imageUri.split(',')[1], 'base64');
  }

  const result = sharp(image)
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
