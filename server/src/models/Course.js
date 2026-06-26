const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: { type: Number, default: 0 }, // in seconds
    videoUrl: { type: String, default: '' },
    isPreview: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    chapterContent: [LectureSchema],
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    courseDescription: {
      type: String,
      default: '',
    },
    courseThumbnail: {
      type: String,
      default: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    },
    category: {
      type: String,
      enum: ['Development', 'Design', 'Marketing', 'Business', 'Other'],
      default: 'Development',
    },
    coursePrice: {
      type: Number,
      required: [true, 'Course price is required'],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numRatings: {
      type: Number,
      default: 0,
    },
    chapters: [ChapterSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: total lecture count across all chapters
CourseSchema.virtual('lecturesCount').get(function () {
  return this.chapters.reduce((total, ch) => total + (ch.chapterContent?.length || 0), 0);
});

// Virtual: total duration in seconds across all lectures
CourseSchema.virtual('duration').get(function () {
  return this.chapters.reduce((total, ch) => {
    return total + (ch.chapterContent || []).reduce((sum, lec) => sum + (lec.lectureDuration || 0), 0);
  }, 0);
});

module.exports = mongoose.model('Course', CourseSchema);
