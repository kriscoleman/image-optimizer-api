import { imageBase64Regex } from '../constants';

const fileUrlValidator = (url: string) => {
  return false;
};
const dataUrlValidator = (url: string) => {
  return imageBase64Regex.test(url);
};
const validator = (url: string) => {
  return url.startsWith('data:') ? dataUrlValidator(url) : fileUrlValidator(url);
};

export default validator;
