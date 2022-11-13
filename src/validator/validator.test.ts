import validator from './validator';

describe('validator', () => {
  const bigImage = 'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2015-02-a-hires_jpg.jpg';

  it('works with dataUrls', () => {
    expect(validator('data:image/jpeg;key=value;base64,UEsDBBQAAAAI')).toBeTruthy();
  });

  it('works with http urls', () => {
    expect(validator(bigImage)).toBeTruthy();
  });

  it('invalidates dataUrls without proper image types', () => {
    const imageTypes = [
      { type: 'avif', expectedToBeValid: true },
      { type: 'gif', expectedToBeValid: true },
      { type: 'jpeg', expectedToBeValid: true },
      { type: 'jpg', expectedToBeValid: true },
      { type: 'png', expectedToBeValid: true },
      { type: 'webp', expectedToBeValid: true },
      { type: 'mov', expectedToBeValid: false },
      { type: 'mp3', expectedToBeValid: false },
      { type: 'exe', expectedToBeValid: false },
      { type: 'zip', expectedToBeValid: false },
      { type: 'tar.gz', expectedToBeValid: false },
    ];

    imageTypes.forEach((t) => {
      expect(validator(`data:image/${t.type};key=value;base64,UESlk3us3nllSSE`)).toBe(t.expectedToBeValid);
    });
  });

  it('invalidates http urls that do not start with http or https', () => {
    expect(validator('htttps://myimage.com/image.jpg')).toBeFalsy();
    expect(validator('github://myimage.com/image.jpg')).toBeFalsy();
    expect(validator('ftp://myimage.com/image.jpg')).toBeFalsy();
  });

  it('invalidates non image files', () => {
    // TODO: test more non-image extensions
    expect(validator('https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.tar.gz')).toBeFalsy();
  });
});
