import validator from './validator';

/**
 * Tests that we can validate our inputs before we do any more processing on them
 * Needs to test that:
 * 1. dataUrls are supported
 * 2. http urls are supported
 * 3. dataUrls are valid (must be for an image, and be of one of the allowed file formats)
 * 4. http urls are valid (must be from http or https protocol, and be of one of the allowed file formats)
 */

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
      { type: 'avif', expectedValidity: true },
      { type: 'gif', expectedValidity: true },
      { type: 'jpeg', expectedValidity: true },
      { type: 'jpg', expectedValidity: true },
      { type: 'png', expectedValidity: true },
      { type: 'webp', expectedValidity: true },
      // now put in some that should fail, too
      { type: 'mov', expectedValidity: false },
      { type: 'mp3', expectedValidity: false },
      { type: 'exe', expectedValidity: false },
      { type: 'zip', expectedValidity: false },
      { type: 'tar.gz', expectedValidity: false },
    ];

    imageTypes.forEach((t) => {
      expect(validator(`data:image/${t.type};key=value;base64,UESlk3us3nllSSE`)).toBe(t.expectedValidity);
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
    expect(validator('https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.msi')).toBeFalsy();
    expect(validator('https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.exe')).toBeFalsy();
  });
});
