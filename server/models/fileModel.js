const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A file must have a title'],
      unique: true,
      trim: true,
      minLength: [
        5,
        'A file title must be greater than or equal to 5 characters',
      ],
      maxLength: [
        100,
        'A file title must be less than or equal to 100 characters',
      ],
    },
    location: String,

    originalname: String,

    description: {
      type: String,
      required: [true, 'A file must have a description'],
      trim: true,
      minLength: [
        10,
        'A file description must be greater than or equal to 20 characters',
      ],
      maxLength: [
        100,
        'A file description must be less than or equal to 100 characters',
      ],
    },

    size: Number,

    mimetype: String,

    uploadedAt: {
      type: Date,
      default: Date.now(),
    },

    downloads: { type: Number, default: 0 },
    emailsSent: { type: Number, default: 0 },

    isFavorite: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
