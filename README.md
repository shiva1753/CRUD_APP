<div align="center">

# 🎓 Student Management System

A clean, fast, and fully functional **CRUD-based Student Management System** built with **React + Vite**.
Manage student records with a beautiful dashboard — no backend, no database, just React.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Components](#-components)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This project was built as part of an **Individual Challenge** to design and implement a Management System with full **CRUD operations** (Create, Read, Update, Delete) within a time constraint.

The goal was to build something that is:
- ✅ Functionally complete with all CRUD operations
- ✅ Visually clean and professional
- ✅ Minimal and easy to understand
- ✅ Ready to run without any backend setup

---

## ✨ Features

| Feature | Description |
|---|---|
| ➕ **Add Student** | Add new students via a validated modal form |
| 👁️ **View Student** | View full student details in a dedicated modal |
| ✏️ **Edit Student** | Update any student's information inline |
| 🗑️ **Delete Student** | Remove a student with a confirmation prompt |
| 🔍 **Live Search** | Filter students instantly by name or roll number |
| 📊 **Stats Dashboard** | See total, active, average GPA, and department count at a glance |
| 🏷️ **Status Badges** | Color-coded badges for Active / Inactive / On Leave |
| ✔️ **Form Validation** | Required field checks with inline error messages |
| 📱 **Responsive Layout** | Works on desktop and tablet screens |
| 🎨 **Separated CSS** | All styles in `Dashboard.css` — zero inline styles in JSX |

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev/)** — UI library with hooks (`useState`)
- **[Vite 5](https://vitejs.dev/)** — Lightning-fast build tool and dev server
- **CSS3** — Custom stylesheet with CSS variables, grid, and flexbox
- **Google Fonts** — Inter typeface for clean typography
- **No external UI libraries** — 100% custom components

---

## 📁 Project Structure

```
student-management/
├── public/
│   └── vite.svg
├── src/
│   ├── Dashboard.jsx       ← Main component (all logic & JSX)
│   ├── Dashboard.css       ← All styles
│   └── main.jsx            ← App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy.

---

## 📖 Usage Guide

### Adding a Student

1. Click the **+ Add Student** button in the top-right corner
2. Fill in the required fields: **Name**, **Roll Number**, and **Email**
3. Optionally set Phone, Department, GPA, and Status
4. Click **Add Student** — the record appears instantly in the table

### Editing a Student

1. Find the student in the table
2. Click the **Edit** button on their row
3. Modify any fields in the pre-filled modal
4. Click **Save Changes**

### Viewing Details

1. Click the **View** button on any row
2. A detail modal shows all stored information
3. From the view modal you can jump directly to **Edit**

### Deleting a Student

1. Click the **Delete** button on any row
2. A confirmation modal appears — click **Yes, Delete** to confirm
3. The record is permanently removed from the list

### Searching

- Type any part of a **student's name** or **roll number** in the search bar
- The table filters in real-time as you type

---

## 🧩 Components

### `Dashboard` (default export)
The root component. Manages all state and renders the full page.

| State | Type | Purpose |
|---|---|---|
| `students` | `Array` | List of all student records |
| `search` | `String` | Current search query |
| `modal` | `String \| null` | Which modal is open (`"add"`, `"edit"`, `"view"`, `"delete"`) |
| `selected` | `Object \| null` | The student currently being acted on |
| `form` | `Object` | Controlled form state for add/edit |

---

### `StudentForm`
Reusable form used in both the **Add** and **Edit** modals.

| Prop | Type | Description |
|---|---|---|
| `form` | `Object` | Current form values |
| `onChange` | `Function` | Updates a single field: `(key, value) => void` |
| `onSubmit` | `Function` | Called after validation passes |
| `onCancel` | `Function` | Closes the modal |
| `label` | `String` | Submit button label |

> Validates that **Name**, **Roll Number**, and **Email** are filled before calling `onSubmit`.

---

### `Modal`
A generic overlay modal wrapper.

| Prop | Type | Description |
|---|---|---|
| `title` | `String` | Modal heading |
| `onClose` | `Function` | Called on × button click or backdrop click |
| `children` | `ReactNode` | Modal body content |

---

### `StatusBadge`
Displays a color-coded pill for student status.

| Status | Color |
|---|---|
| Active | 🟢 Green |
| Inactive | 🟡 Yellow |
| On Leave | 🟣 Purple |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow the existing code style and keep components clean and minimal.

---

## 📄 License

This project is licensed under the **MIT License** — you're free to use, modify, and distribute it.

---

<div align="center">

Built with ❤️ using React + Vite

</div>
