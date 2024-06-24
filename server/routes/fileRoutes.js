const express = require('express');
const multer = require('multer');

const upload = multer();
const fileController = require('../controllers/fileController');

const router = express.Router();

router.route('/').get(fileController.getAllFiles);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/download/:id', fileController.downloadFile);
router.post('/email', upload.single('file'), fileController.emailFile);

router
  .route('/:id')
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);

module.exports = router;
