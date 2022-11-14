import axios from 'axios';

const getImageBufferFromUrl = async (url: string) => {
  return (await axios({ url: url, responseType: 'arraybuffer' })).data as Buffer;
};
export default getImageBufferFromUrl;
