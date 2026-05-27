# 🚀 Portfolio Backend API

Complete Node.js + Express.js + MongoDB REST API backend for Himanshu Kumar Singh's personal portfolio website.

---

## 📁 Folder Structure

```
portfolio-backend/
├── config/
│   └── db.js                  # MongoDB Mongoose database connection
├── models/
│   ├── Project.js             # Project mongoose schema
│   ├── Contact.js             # Contact form mongoose schema
│   ├── Certification.js       # Certification mongoose schema
│   ├── Skill.js               # Skill category mongoose schema
│   └── Experience.js          # Experience mongoose schema
├── controllers/
│   ├── projectController.js   # Project CRUD logic
│   ├── contactController.js   # Contact submission & admin emailing logic
│   ├── certController.js      # Certification CRUD logic
│   ├── skillController.js     # Skill CRUD logic
│   ├── experienceController.js# Experience CRUD logic
│   └── authController.js      # Admin auth login & status logic
├── routes/
│   ├── projectRoutes.js       # Project router
│   ├── contactRoutes.js       # Contact form router
│   ├── certRoutes.js          # Certification router
│   ├── skillRoutes.js         # Skill router
│   ├── experienceRoutes.js    # Experience router
│   ├── authRoutes.js          # Authentication router
│   └── resumeRoutes.js        # Resume upload/download router
├── middleware/
│   ├── authMiddleware.js      # JWT authentication protection
│   ├── errorHandler.js        # Global error handler
│   └── rateLimiter.js         # Request rate limiters (Login & Contact)
├── uploads/
│   └── resume.pdf             # Uploaded PDF resume
├── seed.js                    # Database seed script
├── .env                       # Local environment variables (ignored)
├── .gitignore                 # Git ignore file list
├── package.json               # NPM dependency definitions
└── server.js                  # Application entry point
```

---

## ⚙️ Setup & Installation

### 1. Install Dependencies
Navigate to the backend directory and install the packages:
```bash
cd "H:\Personal portfolio\Backend"
npm install
```

### 2. Configure Environment Variables
Create or update the `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_uri
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
ADMIN_EMAIL=himanshsingh.bit9995@gmail.com
ADMIN_PASSWORD=your_admin_password
GMAIL_USER=himanshsingh.bit9995@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

> **Gmail App Password Setup:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate an app password for Mail and select Other (custom name) for your app.

---

## 🏃 Running & Seeding

### Seed Database
Loads the database with initial portfolio data for projects, skills, certifications, and experience.
```bash
npm run seed
```

### Run Server (Development)
Starts the application in development mode with automatic restarts via `nodemon`.
```bash
npm run dev
```

### Run Server (Production)
```bash
npm start
```

The API will be available at: `http://localhost:5000`

---

## 📡 API Endpoints

### 🔐 Authentication (Admin)
| Method | Endpoint | Access | Rate Limit | Description |
|:---|:---|:---|:---|:---|
| **POST** | `/api/auth/login` | Public | 10 per 15m | Validates credentials & returns 7-day JWT token |
| **GET** | `/api/auth/me` | Protected | None | Returns verified admin details |

### 📂 Projects
| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| **GET** | `/api/projects` | Public | Get all projects sorted by creation date |
| **GET** | `/api/projects?category=fullstack` | Public | Filter projects by category (`fullstack`, `ai-ml`, `frontend`) |
| **GET** | `/api/projects/:id` | Public | Get single project |
| **POST** | `/api/projects` | Protected | Create a new project |
| **PUT** | `/api/projects/:id` | Protected | Update a project |
| **DELETE** | `/api/projects/:id` | Protected | Delete a project |

### ✉️ Contact
| Method | Endpoint | Access | Rate Limit | Description |
|:---|:---|:---|:---|:---|
| **POST** | `/api/contact` | Public | 5 per hour | Save to DB + send email notification to admin |
| **GET** | `/api/contact` | Protected | None | Get all contact messages |
| **PUT** | `/api/contact/:id/read` | Protected | None | Mark message as read |
| **DELETE** | `/api/contact/:id` | Protected | None | Delete a message |

### 🎓 Certifications
| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| **GET** | `/api/certifications` | Public | Get all certifications |
| **POST** | `/api/certifications` | Protected | Add a new certification |
| **DELETE** | `/api/certifications/:id` | Protected | Delete a certification |

### 📊 Skills
| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| **GET** | `/api/skills` | Public | Get all skills grouped by category and sorted by order |
| **POST** | `/api/skills` | Protected | Create a skill category |
| **PUT** | `/api/skills/:id` | Protected | Update a skill category / skills |
| **DELETE** | `/api/skills/:id` | Protected | Delete a skill category |

### 💼 Experience
| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| **GET** | `/api/experience` | Public | Get all experiences sorted by display order |
| **POST** | `/api/experience` | Protected | Add new experience item |
| **PUT** | `/api/experience/:id` | Protected | Update experience item |
| **DELETE** | `/api/experience/:id` | Protected | Delete experience item |

### 📄 Resume
| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| **GET** | `/api/resume/download` | Public | Serves `uploads/resume.pdf` for download |
| **POST** | `/api/resume/upload` | Protected | Upload / replace PDF resume (multer, PDF only, max 5MB) |

---

## 🛠️ Request Payloads

### Admin Login (`POST /api/auth/login`)
```json
{
  "email": "himanshsingh.bit9995@gmail.com",
  "password": "your_admin_password"
}
```

### Add Project (`POST /api/projects`)
```json
{
  "title": "My New Project",
  "description": "Full-stack application description.",
  "category": "fullstack",
  "techStack": ["React", "Node.js", "Express", "MongoDB"],
  "githubLink": "https://github.com/example/project",
  "liveLink": "https://project.com",
  "featured": true
}
```

### Submit Contact Form (`POST /api/contact`)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hi, I looked at your portfolio and would like to build a backend project together!"
}
```

### Add Experience (`POST /api/experience`)
```json
{
  "role": "Software Developer Intern",
  "company": "Company Name",
  "location": "Patna / Remote",
  "startDate": "February 2026",
  "endDate": "Present",
  "techStack": ["React.js", "Node.js", "MongoDB"],
  "summary": "Building features.",
  "accomplishments": ["Added features that improved efficiency by 40%"],
  "order": 1
}
```

---

## 🔒 JWT Route Protection

To access any **Protected** routes, you must authenticate via `/api/auth/login`, grab the `token` from the response, and include it in the `Authorization` header of your requests:

```
Authorization: Bearer <your_jwt_token_here>
```

---

## 👥 Author
**Himanshu Kumar Singh**
- GitHub: [@hima9shusingh](https://github.com/hima9shusingh)
- LinkedIn: [himanshu-singh-255a57257](https://linkedin.com/in/himanshu-singh-255a57257)
- Email: himanshsingh.bit9995@gmail.com
