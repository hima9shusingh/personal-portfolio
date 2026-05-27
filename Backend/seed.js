import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import Certification from './models/Certification.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Skill.deleteMany({});
    await Certification.deleteMany({});

    // Projects (3 total)
    const projects = [
      {
        title: "Adaptive Disaster Response System",
        category: "ai-ml",
        description: "A scalable disaster analysis system using Python and Machine Learning, enabling real-time resource allocation and improving decision-making efficiency during critical scenarios.",
        techStack: ["Python", "Machine Learning", "Data Analytics"],
        githubLink: "https://github.com/hima9shusingh/Adaptive-Disaster-Response-System",
        featured: true
      },
      {
        title: "Smart Expense Tracker",
        category: "fullstack",
        description: "A full-stack expense management application using the MERN stack, implementing secure JWT authentication and RESTful APIs for reliable transaction processing.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
        githubLink: "https://github.com/hima9shusingh/Smart-Expense-Tracker",
        featured: true
      },
      {
        title: "Traffic Management System",
        category: "fullstack",
        description: "A dynamic and intelligent traffic control system that simulates real-time traffic signal management based on traffic density. The system automatically prioritizes roads, adjusts signal timing, and optimizes traffic flow using intelligent algorithms.",
        techStack: ["JavaScript", "HTML5", "CSS3", "Node.js", "MongoDB"],
        githubLink: "https://github.com/hima9shusingh/Traffic-management-system",
        featured: true
      }
    ];

    await Project.insertMany(projects);
    console.log('✅ 3 Projects seeded');

    // Experience (2 total)
    const experience = [
      {
        role: "Software Developer Intern",
        company: "Niranjali fire solution pvt ltd",
        location: "Patna / Remote",
        startDate: "February 2026",
        endDate: "Present",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "AWS"],
        summary: "Architecting and developing a scalable full-stack business application using the MERN stack.",
        accomplishments: [
          "Architected a scalable full-stack business application using MERN stack, improving client onboarding efficiency by 40%",
          "Engineered secure RESTful APIs and optimized database queries, reducing data retrieval latency by 25%",
          "Implemented automated CI/CD pipelines; leading production deployment on AWS and Vercel"
        ],
        order: 1
      },
      {
        role: "Intern - Full Stack Development",
        company: "Thiranex",
        location: "Remote / Project-Based",
        startDate: "01 May 2026",
        endDate: "31 May 2026",
        techStack: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "MongoDB"],
        summary: "Worked on practical full-stack projects under industry mentorship with periodic progress reviews.",
        accomplishments: [
          "Developed and deployed full-stack web applications in project-based environment",
          "Collaborated with industry mentors to implement best practices in web development",
          "Completed hands-on projects demonstrating proficiency in MERN stack"
        ],
        order: 2
      }
    ];

    await Experience.insertMany(experience);
    console.log('✅ 2 Internships seeded');

    // Skills (6 categories - same as before)
    const skills = [
      {
        category: "Frontend",
        skills: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
        order: 1
      },
      {
        category: "Backend",
        skills: ["Node.js", "Express.js", "REST API Development"],
        order: 2
      },
      {
        category: "Languages",
        skills: ["JavaScript", "Java", "Python"],
        order: 3
      },
      {
        category: "Database",
        skills: ["MongoDB", "MySQL"],
        order: 4
      },
      {
        category: "Tools & DevOps",
        skills: ["Git", "GitHub", "AWS", "Vercel", "Postman", "CI/CD"],
        order: 5
      },
      {
        category: "Core CS",
        skills: ["DSA", "OOP", "DBMS", "Operating Systems", "System Design"],
        order: 6
      }
    ];

    await Skill.insertMany(skills);
    console.log('✅ 6 Skills seeded');

    // Certifications (1 total - same as before)
    const certifications = [
      {
        name: "Data Science Using Python",
        issuer: "IBM — Cognitive Class",
        credentialId: "PY0101EN",
        certificateLink: "/ibm-data-science-certificate.pdf"
      }
    ];

    await Certification.insertMany(certifications);
    console.log('✅ 1 Certification seeded');

    console.log('\n✅ All data seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - 3 Projects');
    console.log('   - 2 Internships');
    console.log('   - 6 Skills');
    console.log('   - 1 Certification');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
