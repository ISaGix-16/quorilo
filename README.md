# Quorilo

**Your words. Your world.**

Quorilo is a full-stack blogging platform where users can create an account, publish articles, upload featured images, edit their posts, and explore content shared by the community.

## Features

- User authentication with signup, login, and logout
- Create and publish blog posts
- Rich-text article editor powered by TinyMCE
- Upload and display featured images
- Edit existing posts
- Delete posts with confirmation
- Browse latest and all published posts
- Responsive dark UI
- Protected routes for authenticated users
- Sanitized article content using DOMPurify
- Production deployment with Vercel

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- React Hook Form

### Backend & Services
- Appwrite Authentication
- Appwrite TablesDB
- Appwrite Storage

### Editor & Security
- TinyMCE
- DOMPurify

### Deployment
- Vercel

## Screens / Pages

Quorilo includes:

- Home
- Login
- Signup
- All Posts
- Add Post
- Edit Post
- Individual Article View

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ISaGix-16/quorilo.git
cd quorilo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your configuration:

```env
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TABLE_ID=your_table_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

> Do not commit your `.env` file or expose private credentials.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## Production Build

Create a production build with:

```bash
npm run build
```

The generated production files will be available in the `dist` directory.

## Appwrite Setup

The project requires an Appwrite project with:

- Authentication enabled
- A database and table for blog posts
- A Storage bucket for featured images
- Appropriate permissions for the required users/resources
- Your local and production domains added as Web platforms

The post data includes fields such as:

```text
title
content
featuredImage
status
userId
```

## Deployment

Quorilo is configured to work with Vercel.

When deploying:

1. Import the GitHub repository into Vercel.
2. Select **Vite** as the framework.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Add the required `VITE_*` environment variables.
6. Add the deployed Vercel hostname as a Web platform in Appwrite.

## Project Structure

```text
quorilo/
├── public/
│   └── Quorilo-Logo.png
├── src/
│   ├── appwrite/
│   ├── components/
│   ├── conf/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── README.md
```

## Design

Quorilo uses a minimal, content-focused dark interface with charcoal surfaces and a muted teal accent.

The interface was designed to keep the reading and writing experience clean without overly bright elements or gradients.

## Repository

GitHub: `ISaGix-16/quorilo`

## Author

**Aman Arya**

GitHub: `ISaGix-16`

---

Built with React, Appwrite, and a lot of debugging. 🚀
