import getImageBufferFromUrl from './get-image-buffer-from-url';

describe('get-image-buffer-from-url', () => {
  it('works', () => {
    const bigImage = 'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2015-02-a-hires_jpg.jpg';
    const buffer = getImageBufferFromUrl(bigImage);
    expect(buffer).toBeTruthy();
  });
});
