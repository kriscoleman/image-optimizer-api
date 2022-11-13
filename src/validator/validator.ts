import { imageBase64Regex } from '../constants';

export const allowedFileExtensions = ['avif', 'gif', 'jpeg', 'jpg', 'png', 'webp'];

const fileUrlValidator = (url: string) => {
  let fileExtensionIsGood = false;
  for (let i = 0; i < allowedFileExtensions.length; i++) {
    const fileExt = allowedFileExtensions[i];
    fileExtensionIsGood = url.endsWith(fileExt);
    // abort early - don't over iterate
    if (fileExtensionIsGood) break;
  }

  if (!fileExtensionIsGood) return false;

  let urlObject;
  try {
    urlObject = new URL(url);
  } catch (_) {
    return false;
  }
  return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
};

const dataUrlValidator = (url: string) => {
  return imageBase64Regex.test(url);
};

const validator = (url: string) => {
  return url.startsWith('data:') ? dataUrlValidator(url) : fileUrlValidator(url);
};

export default validator;
