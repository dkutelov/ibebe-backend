const { Router } = require('express');
const imageService = require('../services/imageService');
const streamifier = require('streamifier');
const cloudinary = require('../../config/cloudinary.config');

const router = new Router();

router.post('/', async (req, res) => {
  console.log(req.files);
  const file = req.files.image;

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { tags: 'ibebe' },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );

      streamifier.createReadStream(file.data).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    return result;
  }

  try {
    const result = await upload(req);
    res.json({
      message: 'Image uploaded successfully!',
      url: result.secure_url,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.delete('/', async (req, res) => {
  try {
    const deletedImage = await imageService.remove(req.body);
    res.json(deletedImage);
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
