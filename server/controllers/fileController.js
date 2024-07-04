const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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
    const ext = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${uuidv4()}${ext}`);
  },
});
const checkFileType = (file, cb) => {
  const fileExts = /jpeg|jpg|png|gif|webp|svg|ppt|pptx|xls|xlsx|pdf|doc|docx/;
  const mimeTypes =
    /image\/jpeg|image\/jpg|image\/png|image\/gif|image\/webp|image\/svg\+xml|application\/vnd\.ms-powerpoint|application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation|application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/;

  const extname = fileExts.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimeTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new AppError('File not supported for upload!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 7 * 1024 * 1024 },
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
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path,
    description,
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

  const filePath = `https://fileserver.up.railway.app/uploads/${file.filename}`;

  if (!filePath) {
    return next(new AppError('File does not exist on the server', 404));
  }

  res.set({
    'Content-Disposition': `attachment; filename="${file.originalname}"`,
    'Content-Type': file.mimetype,
  });

  res.download(filePath, file.originalname, async (err) => {
    if (err) {
      return next(new AppError('Error downloading the file', 500));
    }

    try {
      file.downloads += 1;
      await file.save();
    } catch (error) {
      return next(new AppError('Error updating file download count', 500));
    }
  });
});

exports.emailFile = catchAsync(async (req, res, next) => {
  const { recipient, subject, message, fileId } = req.body;

  const file = await File.findById(fileId);

  if (!file) return next(new AppError('File not found', 404));

  try {
    const url = `${req.protocol}://${req.get('host')}/api/files/download/${fileId}`;

    const options = {
      message,
    };

    await new Email(
      { email: recipient, name: 'sir/madam' },
      url,
      options,
    ).sendFile(subject);

    file.emailsSent += 1;
    await file.save();

    res.status(200).json({
      status: 'success',
      message: 'Email sent successfully!',
    });
  } catch (error) {
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
exports.restoreFile = catchAsync(async (req, res, next) => {
  const file = await File.findByIdAndUpdate(
    req.params.id,
    { isTrashed: false },
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

exports.getFileStats = catchAsync(async (req, res, next) => {
  const totalFiles = await File.countDocuments();

  const totalDownloads = await File.aggregate([
    { $group: { _id: null, totalDownloads: { $sum: '$downloads' } } },
  ]);

  const averageFileSize = await File.aggregate([
    { $group: { _id: null, averageSize: { $avg: '$size' } } },
  ]);

  const mostDownloadedFile = await File.findOne().sort('-downloads');

  const favoriteFilesCount = await File.countDocuments({ isFavorite: true });

  const recentFiles = await File.find().sort({ uploadedAt: -1 });

  const stats = {
    totalFiles,
    totalDownloads: totalDownloads[0]?.totalDownloads || 0,
    averageFileSize: averageFileSize[0]?.averageSize || 0,
    mostDownloadedFile,
    favoriteFilesCount,
    recentFiles,
  };

  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});
