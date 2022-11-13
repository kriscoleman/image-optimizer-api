import getImageBufferFromUrl from './get-image-buffer-from-url';

describe('get-image-buffer-from-url', () => {
  it('works', async () => {
    const tinyImage = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png';
    const buffer = await getImageBufferFromUrl(tinyImage);
    expect(buffer).toBeTruthy();
  });
});
