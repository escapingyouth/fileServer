const express = require('express');
const multer = require('multer');

const upload = multer();
const fileController = require('../controllers/fileController');

const router = express.Router();

router
  .route('/')
  .get(fileController.getAllFiles)
  .post(upload.single('file'), fileController.uploadFile);

router
  .route('/:id')
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);
router.patch('/:id/trash', fileController.moveToTrash);

router.get('/download/:id', fileController.downloadFile);
router.post('/email', upload.single('file'), fileController.emailFile);

module.exports = router;
