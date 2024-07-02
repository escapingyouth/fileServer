const path = require('path');
const multer = require('multer');
const File = require('../models/fileModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp|svg|ppt|pptx|xls|xlsx|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new AppError('File not supported for upload!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

exports.uploadFileMulter = upload.single('file');

exports.getAllFiles = catchAsync(async (req, res, next) => {
  const files = await File.find();

  res.status(200).json({
    status: 'success',
    results: files.length,
    data: {
      files,
    },
  });
});

exports.getFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) return next(new AppError('No file found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      file,
    },
  });
});

exports.uploadFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('No file uploaded', 400));

  const { title, description } = req.body;

  const newFile = await File.create({
    title,
    description,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });

  res.status(201).json({
    status: 'success',
    data: { file: newFile },
  });
});

exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(new AppError('No file found with that ID', 404));
  }

  const filePath = path.join(__dirname, '../public/uploads', file.originalname);

  await res.download(filePath, file.originalname);

  file.downloads += 1;
  await file.save();

  res.send(file.buffer);
});

exports.emailFile = catchAsync(async (req, res, next) => {
  const { recipient, subject, message, fileId } = req.body;

  const file = await File.findById(fileId);

  if (!file) return next(new AppError('File not found', 404));

  try {
    const url = `${req.protocol}://${req.get('host')}/api/files/download/${fileId}`;

    const options = {
      message,
      file,
    };

    await new Email({ email: recipient }, url, options).sendFile(subject);

    file.emailsSent += 1;
    await file.save();

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.log(error);
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.updateFile = catchAsync(async (req, res, next) => {
  const file = await File.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!file) return next(new AppError('No file found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { file },
  });
});

exports.moveToTrash = catchAsync(async (req, res, next) => {
  const file = await File.findByIdAndUpdate(
    req.params.id,
    { isTrashed: true },
    { new: true },
  );
  if (!file) return next(new AppError('No file found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      file,
    },
  });
});

exports.deleteFile = catchAsync(async (req, res, next) => {
  const file = await File.findByIdAndDelete(req.params.id);

  if (!file) return next(new AppError('No file found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
