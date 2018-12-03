const express = require("express");
const router = express.Router();
const _ = require('underscore');

router.post('/upload', async (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  let type = req.files.file.mimetype;
  type = type.substring(0, (type.indexOf('/')))
  const path = type === 'image' ? 'artwork' : 'songs';
  uploadFile.mv(
    `musicseed_react/public/${path}/${fileName}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
})

module.exports = router;