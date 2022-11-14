import optimizer from './optimizer';

let imageUrl: string;
const tinyImageHttpUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png';

describe('optimizer and get-image-buffer-from-url integration', () => {
  beforeEach(() => {
    imageUrl = tinyImageHttpUrl;
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
});

describe('optimizer and validator integration', () => {
  it('invalidates non image files', async () => {
    imageUrl = 'https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.tar.gz';
    expect(optimizer(imageUrl)).rejects.toThrow('invalid request');

    imageUrl = 'https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.zip';
    expect(optimizer(imageUrl)).rejects.toThrow('invalid request');

    imageUrl = 'https://nodejs.org/dist/v18.12.1/node-v18.12.1-darwin-x64.msi';
    expect(optimizer(imageUrl)).rejects.toThrow('invalid request');
  });

  it('invalidates non image dataUrls', async () => {
    imageUrl = 'data:text/html,base64;ARUSL1ius90k';
    expect(optimizer(imageUrl)).rejects.toThrow('invalid request');
  });
});
