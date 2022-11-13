import optimizer from './optimizer';

describe('optimizer', () => {
  const bigImage = 'https://www.nasa.gov/sites/default/files/thumbnails/image/hs-2015-02-a-hires_jpg.jpg';
  it('works with a valid image', () => {
    const results = optimizer(bigImage);
    expect(results).toBeTruthy();
  });

  it('works when invoked without args', () => {
    const results = optimizer(undefined!);
    expect(results).toBeFalsy();
  });

  it('reduces image size', () => {
    const results = optimizer(bigImage);
    expect(results?.bytes).toBeLessThan(21036224);
  });

  it('returns the image as a dataUrl', () => {
    const results = optimizer(bigImage);
  });

  // describe('validation', () => {
  //   it('invalidates non image files', () => {
  //     // TODO: test more non-image extensions
  //     const results = optimizer('https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.tar.gz');
  //     expect(results).toThrow('invalid request');
  //   });

  //   it('invalidates non image dataUrls', () => {
  //     // todo:
  //   });
  // });
});
