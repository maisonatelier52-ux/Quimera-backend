const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'Root',
  api_key: '674313959543328',
  api_secret: 'jB91AjlM2ncfzBowBYzevDxEYNM'
});

cloudinary.api.ping(function(error, result) {
  if (error) {
    console.error("Cloudinary Ping Error:", error);
  } else {
    console.log("Cloudinary Ping Success:", result);
  }
});
