import sharp from 'sharp';
import getImageBufferFromUrl from '../get-image-buffer-from-url/get-image-buffer-from-url';
import validator from '../validator/validator';

/**
 * Optimizes images from dataUrls and http urls to reduce fize size and bandwidth pressure
 *
 * @param {string} imageUri
 * @returns
 */
const optimizer = async (imageUri: string) => {
  if (!imageUri) return;

  if (!validator(imageUri)) throw new Error('invalid request');

  const httpUrlDetected = imageUri.startsWith('http');
  let image;
  if (httpUrlDetected) {
    image = await getImageBufferFromUrl(imageUri);
  } else {
    image = Buffer.from(imageUri.split(',')[1], 'base64');
  }

  const result = sharp(image)
    .avif({ quality: 80, force: false })
    .jpeg({ quality: 80, progressive: true, force: false })
    .png({ quality: 80, progressive: true, force: false })
    .webp({ quality: 80, force: false })
    // todo: test metadata?
    .withMetadata();

  // todo: test
  const getMimeTypeFromHttpUrl = (url: string) => url.substring(url.lastIndexOf('.') + 1);

  const getMimeTypeFromDataUrl = (dataUrl: string) => dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));

  const mimeType = imageUri.startsWith('http') ? getMimeTypeFromHttpUrl(imageUri) : getMimeTypeFromDataUrl(imageUri);

  return {
    buffer: result.toBuffer() as Promise<Buffer>,
    mimeType: mimeType,
  };
};

export default optimizer;
