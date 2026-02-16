# 📰 Article Hub

Article Hub is a scalable, modular Angular application built with Angular 17.  
It follows enterprise-grade best practices such as lazy loading, feature modules, centralized error handling, authentication, route guards, and a shared component architecture.

The project is designed to be maintainable, extensible, and team-friendly.

---

## 🛠 Tech Stack

- **Frontend Framework:** Angular 17
- **Component Library** Angular Material
- **Language:** TypeScript
- **Styling:** SCSS
- **Testing:** Jasmine & Karma
- **Build System:** Angular CLI (esbuild)

---

## 📁 Project Structure

```
Rahul Angular Project
├── .angular/
├── .github/
├── .husky/
├── .vscode/
├── dist/
├── node_modules/
├── src/
|   ├── app/
|   │   ├── core/
|   │   │   ├── guards/
|   │   │   ├── handlers/
|   │   │   ├── interceptors/
|   │   │   └── services/
|   │   │
|   │   ├── modules/
|   │   │   ├── auth/
|   │   │   │   ├── models/
|   │   │   │   ├── pages/
|   │   │   │   │   ├── login/
|   │   │   │   │   │   └── login.component.*
|   │   │   │   │   └── signup/
|   │   │   │   │       └── signup.component.*
|   │   │   │   ├── auth-routing.module.ts
|   │   │   │   └── auth.module.ts
|   │   │   │
|   │   │   └── article/
|   │   │       ├── models/
|   │   │       ├── pages/
|   │   │       │   ├── dashboard/
|   │   │       │   └── article-detail/
|   │   │       ├── article-routing.module.ts
|   │   │       └── article.module.ts
|   │   │
|   │   ├── shared/
|   │   │   ├── components/
|   │   │   │   ├── article-card/
|   │   │   │   ├── loading/
|   │   │   │   ├── navbar/
|   │   │   │   |── no-content/
|   │   │   │   |── layout/
|   │   │   │   └── snackbar/
|   │   │   ├── constants/
|   │   │   ├── models/
|   │   │   └── shared.module.ts
|   │   │
|   │   ├── app-routing.module.ts
|   │   ├── app.component.html
|   │   ├── app.component.spec.ts
|   │   ├── app.component.ts
|   │   └── app.module.ts
|   │
|   ├── assets/
|   │   └── images/
|   │
|   ├── environments/
|   │   ├── environment.ts
|   │   └── environment.development.ts
|   │
|   ├── styles/
|   │   ├── abstracts/
|   │   ├── base/
|   │   ├── constants/
|   │   └── _main.scss
|   │
|   ├── index.html
|   ├── main.ts
|   └── styles.scss
├── .browserslistrc
├── .editorconfig
├── .gitignore
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── .stylelintrc.json
│
├── angular.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── README.md
│
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json

```

# Rahul Angular Project

## 🚀 Project Setup

Follow these steps to set up and run the project locally.

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js:** v20.10.0+
- **Angular CLI:** v17.0.0+

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com

# Enter the project directory
cd FE-Rahul-Sachdeva-UID00699-Angular-Assignment

# Use NPM Required version
nvm install 20.20.0
nvm use 20.20.0

# Install dependencies
npm install

Run the Application

# Start the local development server
ng serve

Development Server: http://localhost:4200.

📜 Available Scripts

ng serve: Run the app in development mode

ng build: Build the app for production

ng test: Run unit tests

ng lint: Run lint checks

## Running Application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```
