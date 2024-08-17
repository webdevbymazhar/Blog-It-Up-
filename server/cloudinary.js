const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'mazhar',
  api_key: '938495637531691',
  api_secret: 'G6yBwN3BzQQJfFaAsilPBbyKM7o'
});

module.exports = cloudinary;