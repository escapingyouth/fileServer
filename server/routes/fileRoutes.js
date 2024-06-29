const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

router
  .route('/')
  .get(fileController.getAllFiles)
  .post(fileController.uploadFileMulter, fileController.uploadFile);

router
  .route('/:id')
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);
router.patch('/:id/trash', fileController.moveToTrash);

router.get('/download/:id', fileController.downloadFile);
router.post('/email', fileController.emailFile);

module.exports = router;
