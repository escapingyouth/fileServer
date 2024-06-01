const File = require('../models/fileModel');

exports.getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find();

    res.status(200).json({
      status: 'success',
      results: files.length,
      data: {
        files,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        file,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createFile = async (req, res, next) => {
  try {
    const newFile = await File.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { file: newFile },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateFile = async (req, res, next) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { file },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    await File.findByIdAndDelete(req.params.id);

    res.status(204).json({
      staus: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
