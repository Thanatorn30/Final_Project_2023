const cloudinary = require("../config/cloudinary");
exports.upload = async (path, publicId) => {
  const option = {
    use_filename: true,
    overwrite: true,
    unique_filename: false,
  };
  if (publicId) {
    option.public_id = publicId;
  }
  const data = await cloudinary.uploader.upload(path,option);
  return data.secure_url;
};

exports.getPublicId = (url) => {
  const split = url.split("/");
  return split[split.length - 1].split(".")[0];
};
