import sharp from 'sharp';

const optimizer = async (imageUri: string) => {
  if (!imageUri) return;

  let image;
  if (imageUri.startsWith('http')) {
    image = 
  }

  const result = await sharp()
    .avif({ force: false })
    .jpeg({ progressive: true, force: false })
    .png({ progressive: true, force: false })
    .webp({ force: false });

  return {
    buffer: result.toBuffer(),
    bytes: 9999999999,
  };
};

export default optimizer;
