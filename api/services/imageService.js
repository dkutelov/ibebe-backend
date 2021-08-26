const cloudinary = require('../../config/cloudinary.config');
const streamifier = require('streamifier');
const Image = require('../../models/Image');

function create(imageFile) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
  }

  upload(req);
}

function addImage(imageURL, isMain) {
  const image = new Image({ imageURL, isMain });
  return image.save();
}

function remove(data) {
  const { id } = data;
  return dataFactory.deleteOne(id);
}

function findByUrl(url) {
  return Image.findOne({ imageURL: url });
}

module.exports = {
  create,
  remove,
  addImage,
  findByUrl,
};
