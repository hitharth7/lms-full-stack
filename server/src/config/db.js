const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');

// ─── Demo courses seed data (mirrors the frontend's INITIAL_COURSES) ───────────
const DEMO_COURSES = [
  {
    courseTitle: 'Complete React & Next.js Masterclass: Zero to Production',
    courseDescription:
      '<p>Become a professional frontend developer. Learn React 19, Next.js 15, state management, animations, and deploy production-ready applications.</p><h3>What you\'ll learn:</h3><ul><li>React 19 Hooks and Component Architecture</li><li>Next.js App Router, Server Components, & SSR</li><li>State management with Tailwind styling</li><li>Optimizing performance and accessibility</li></ul>',
    courseThumbnail: 'course_1_thumbnail',
    coursePrice: 99.99,
    discount: 20,
    isPublished: true,
    category: 'Development',
    rating: 4.8,
    numRatings: 324,
    chapters: [
      {
        chapterId: 'c1',
        chapterTitle: 'Section 1: Course Overview & Basic Concepts',
        chapterContent: [
          { lectureId: 'l1_1', lectureTitle: '01. Introduction & Welcome', lectureDuration: 300, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'l1_2', lectureTitle: '02. React 19 Setup & Core Concepts', lectureDuration: 900, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l1_3', lectureTitle: '03. Building Your First Component', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'c2',
        chapterTitle: 'Section 2: Mastering Tailwind CSS in React Projects',
        chapterContent: [
          { lectureId: 'l2_1', lectureTitle: '04. Tailwind CSS V4 Overview', lectureDuration: 600, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'l2_2', lectureTitle: '05. Layouts & Responsive Design', lectureDuration: 1500, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l2_3', lectureTitle: '06. Flexbox, Grid, & Absolute Layouts', lectureDuration: 1800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'c3',
        chapterTitle: 'Section 3: Routing & Next.js Navigation',
        chapterContent: [
          { lectureId: 'l3_1', lectureTitle: '07. What is Next.js App Router?', lectureDuration: 800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l3_2', lectureTitle: '08. Creating Dynamic Routes', lectureDuration: 1400, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l3_3', lectureTitle: '09. Link Component & Routing Programmatically', lectureDuration: 1100, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'c4',
        chapterTitle: 'Section 4: Final Project Build & Deployment',
        chapterContent: [
          { lectureId: 'l4_1', lectureTitle: '10. Full Stack Project Setup', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l4_2', lectureTitle: '11. Deploying to Vercel', lectureDuration: 900, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'l4_3', lectureTitle: '12. Summary & Next Steps', lectureDuration: 500, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
    ],
  },
  {
    courseTitle: 'Figma UI/UX Design Fundamentals: Master Modern Product Design',
    courseDescription:
      '<p>Learn design principles, wireframing, high-fidelity UI design, prototyping, and developer handoff in Figma. No design experience required.</p><h3>What you\'ll learn:</h3><ul><li>UX/UI core principles & theories</li><li>Typography, grids, and responsive components</li><li>Prototyping with interactive transitions</li><li>Setting up responsive Auto-Layouts</li></ul>',
    courseThumbnail: 'course_2_thumbnail',
    coursePrice: 89.99,
    discount: 15,
    isPublished: true,
    category: 'Design',
    rating: 4.6,
    numRatings: 184,
    chapters: [
      {
        chapterId: 'd1',
        chapterTitle: 'Section 1: Designing for Humans (UX)',
        chapterContent: [
          { lectureId: 'ld1_1', lectureTitle: '01. Introduction to Product Design', lectureDuration: 400, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'ld1_2', lectureTitle: '02. Wireframing & User Research Basics', lectureDuration: 1000, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'd2',
        chapterTitle: 'Section 2: Mastering Figma Tools',
        chapterContent: [
          { lectureId: 'ld2_1', lectureTitle: '03. Canvas Navigation & Vector Networks', lectureDuration: 900, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'ld2_2', lectureTitle: '04. Working with Colors, Gradients & Shadows', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'ld2_3', lectureTitle: '05. Understanding Components & Variants', lectureDuration: 1600, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'd3',
        chapterTitle: 'Section 3: Responsive layouts (Auto-Layout)',
        chapterContent: [
          { lectureId: 'ld3_1', lectureTitle: '06. Auto-Layout 101: Alignment & Spacing', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'ld3_2', lectureTitle: '07. Wrapping & Filling Containers', lectureDuration: 1500, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'ld3_3', lectureTitle: '08. Creating Interactive Accordions & Modals', lectureDuration: 1800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
    ],
  },
  {
    courseTitle: 'Digital Marketing Strategy & SEO Bootcamp',
    courseDescription:
      '<p>Master SEO, Google Analytics, social media ads, email marketing, and content strategies. Drive organic traffic and conversion rates.</p>',
    courseThumbnail: 'course_3_thumbnail',
    coursePrice: 79.99,
    discount: 10,
    isPublished: true,
    category: 'Marketing',
    rating: 4.5,
    numRatings: 98,
    chapters: [
      {
        chapterId: 'm1',
        chapterTitle: 'Section 1: SEO Fundamentals',
        chapterContent: [
          { lectureId: 'lm1_1', lectureTitle: '01. Search Engine Mechanics', lectureDuration: 600, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lm1_2', lectureTitle: '02. Keyword Research & Competitor Analysis', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lm1_3', lectureTitle: '03. On-Page vs Off-Page Optimizations', lectureDuration: 1400, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'm2',
        chapterTitle: 'Section 2: Social Media Marketing & Campaigns',
        chapterContent: [
          { lectureId: 'lm2_1', lectureTitle: '04. Facebook & Instagram Ad Setup', lectureDuration: 1500, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lm2_2', lectureTitle: '05. Copywriting for Conversion Optimization', lectureDuration: 1100, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lm2_3', lectureTitle: '06. Analyzing Campaign ROAS in GA4', lectureDuration: 1800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
    ],
  },
  {
    courseTitle: 'Python for Data Science & AI Foundations',
    courseDescription:
      '<p>Learn Python programming, NumPy, Pandas, Matplotlib, Seaborn, and introductory Machine Learning models. Solve data analytics problems.</p>',
    courseThumbnail: 'course_4_thumbnail',
    coursePrice: 129.99,
    discount: 25,
    isPublished: true,
    category: 'Development',
    rating: 4.9,
    numRatings: 412,
    chapters: [
      {
        chapterId: 'py1',
        chapterTitle: 'Section 1: Python Basics',
        chapterContent: [
          { lectureId: 'lpy1_1', lectureTitle: '01. Introduction to Python & Jupyter', lectureDuration: 500, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lpy1_2', lectureTitle: '02. Variables, Conditionals, & Loops', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpy1_3', lectureTitle: '03. Python Lists, Tuples, & Dictionaries', lectureDuration: 1400, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'py2',
        chapterTitle: 'Section 2: Data Manipulation with Pandas',
        chapterContent: [
          { lectureId: 'lpy2_1', lectureTitle: '04. Loading Data into DataFrames', lectureDuration: 1100, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lpy2_2', lectureTitle: '05. Cleaning and Filtering Datasets', lectureDuration: 1500, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpy2_3', lectureTitle: '06. Grouping and Merging Tables', lectureDuration: 1600, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'py3',
        chapterTitle: 'Section 3: Data Visualization & Intro to ML',
        chapterContent: [
          { lectureId: 'lpy3_1', lectureTitle: '07. Plotting Line & Bar Charts', lectureDuration: 900, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpy3_2', lectureTitle: '08. Creating Heatmaps & Pairplots', lectureDuration: 1000, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpy3_3', lectureTitle: '09. Building Your First Linear Regression', lectureDuration: 1800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
    ],
  },
  {
    courseTitle: 'Product Management 101: Launch Successful Products',
    courseDescription:
      '<p>Learn user journey mapping, writing PRDs, product design sprints, agile methods, roadmap building, and how to work with devs and stakeholders.</p>',
    courseThumbnail: 'course_1_thumbnail',
    coursePrice: 109.99,
    discount: 0,
    isPublished: true,
    category: 'Business',
    rating: 4.7,
    numRatings: 67,
    chapters: [
      {
        chapterId: 'pm1',
        chapterTitle: 'Section 1: The Product Lifecycle',
        chapterContent: [
          { lectureId: 'lpm1_1', lectureTitle: '01. Role of a Product Manager', lectureDuration: 400, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lpm1_2', lectureTitle: '02. Market Research & User Persona Design', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpm1_3', lectureTitle: '03. Defining the MVP & Feature Prioritization', lectureDuration: 1400, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
      {
        chapterId: 'pm2',
        chapterTitle: 'Section 2: Agile PM & Roadmapping',
        chapterContent: [
          { lectureId: 'lpm2_1', lectureTitle: '04. Writing a Product Requirements Document (PRD)', lectureDuration: 1600, videoUrl: 'Ke90Tje7VS0', isPreview: true },
          { lectureId: 'lpm2_2', lectureTitle: '05. Agile Sprints, Scrums, & Kanban Boards', lectureDuration: 1200, videoUrl: 'Ke90Tje7VS0', isPreview: false },
          { lectureId: 'lpm2_3', lectureTitle: '06. Constructing a Multi-Quarter Roadmap', lectureDuration: 1800, videoUrl: 'Ke90Tje7VS0', isPreview: false },
        ],
      },
    ],
  },
];

// ─── Seed users ────────────────────────────────────────────────────────────────
const seedDefaultUsers = async () => {
  const studentEmail = 'alex.morgan@academy.com';
  const educatorEmail = 'educator@academy.com';

  if (!(await User.findOne({ email: studentEmail }))) {
    await User.create({ name: 'Alex Morgan', email: studentEmail, password: 'demo123', role: 'student' });
    console.log(`✔ Default student seeded: ${studentEmail}`);
  }

  let educator = await User.findOne({ email: educatorEmail });
  if (!educator) {
    educator = await User.create({ name: 'GreatStack', email: educatorEmail, password: 'demo123', role: 'educator' });
    console.log(`✔ Default educator seeded: ${educatorEmail}`);
  }

  return educator;
};

// ─── Seed demo courses ─────────────────────────────────────────────────────────
const seedDemoCourses = async (educator) => {
  const courseCount = await Course.countDocuments();
  if (courseCount > 0) return; // Already seeded

  for (const courseData of DEMO_COURSES) {
    await Course.create({ ...courseData, educator: educator._id });
  }
  console.log(`✔ ${DEMO_COURSES.length} demo courses seeded into MongoDB`);
};

// ─── Main connectDB ─────────────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✔ MongoDB Connected: ${conn.connection.host}`);
    const educator = await seedDefaultUsers();
    await seedDemoCourses(educator);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
