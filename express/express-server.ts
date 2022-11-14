import express from 'express';
import optimizer from '../src/optimizer/optimizer';

const port = 3000;

const app = express();

app.get('/web/*', async (req, res) => {
  var imageSrc = req.query.src as string;
  let optimizedImage;

  try {
    optimizedImage = await optimizer(imageSrc?.toString());
  } catch (error) {
    if (JSON.stringify(error).includes('invalid request')) return res.sendStatus(400);
    return res.sendStatus(500);
  }
  const mime = `image/${optimizedImage?.mimeType}`;
  res.contentType(mime);
  res.end(new Uint8Array((await optimizedImage?.buffer)?.buffer || []), 'binary');
});
app.listen(port, () => console.log(`Optimizer App listening on port ${port}!`));
