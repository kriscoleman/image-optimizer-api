import optimizer from './optimizer';

// TODO: mock
let imageUrl: string;
const tinyImageHttpUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png';
const tinyImageDataUrl =
  'data:image/png;base64,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';

describe('optimizer', () => {
  beforeEach(() => {
    imageUrl = tinyImageHttpUrl;
  });

  it('works with a valid http url image', async () => {
    const results = await optimizer(imageUrl);
    expect(results).toBeTruthy();
  });

  it('works with a valid dataUrl image', async () => {
    imageUrl = tinyImageDataUrl;
    const results = await optimizer(imageUrl);
    expect(results).toBeTruthy();
  });

  it('works when invoked without args', async () => {
    const results = await optimizer(undefined!);
    expect(results).toBeFalsy();
  });

  it('reduces image size', async () => {
    const results = await optimizer(imageUrl);

    // note: if you go to the tinyImage url above and check the content-length of the response header for this image,
    //       you'll notice it should be 3501.
    //       we are checking if we actually reduce the image
    const originalFileSize = 3501;
    expect((await results?.buffer)?.byteLength).toBeLessThan(originalFileSize);

    // note: now let's check that we are at our best.
    //       I've set a regression benchmark, and we can check it here to make sure we're reducing the file as good,
    //       or better, than we have before.

    const regressionBenchmark = 2642;
    expect((await results?.buffer)?.byteLength).toBeLessThanOrEqual(regressionBenchmark);
  });

  // it('returns the image as a dataUrl', () => {
  // const results = optimizer(tinyImage);
  // });

  //TODO: integration tests
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
