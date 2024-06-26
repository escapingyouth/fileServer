const File = require('../models/fileModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

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

  const { fieldname, originalname, size, mimetype, buffer } = req.file;

  const newFile = await File.create({
    ...req.body,
    fieldname,
    originalname,
    size,
    mimetype,
    fileData: buffer,
  });
  console.log(newFile.fileData.buffer);

  res.status(201).json({
    status: 'success',
    data: { file: newFile },
  });
});

exports.downloadFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) return next(new AppError('No file found with that ID', 404));

  res.set('Content-Type', file.mimetype);
  res.set('Content-Disposition', `attachment; filename="${file.title}"`);
  res.send(file.fileData);
});

exports.emailFile = catchAsync(async (req, res, next) => {
  const { recipient, subject, message } = req.body;
  const { file } = req;

  if (!file) return next(new AppError('No file uploaded for email', 400));

  try {
    await sendEmail({
      recipient,
      subject,
      message,
      file,
    });

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.log(error);
    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
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
