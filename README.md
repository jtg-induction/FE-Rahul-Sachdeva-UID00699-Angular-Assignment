# 📰 Article Hub

Article Hub is a scalable, modular Angular application built with Angular 17.  
It follows enterprise-grade best practices such as lazy loading, feature modules, centralized error handling, authentication, route guards, and a shared component architecture.

The project is designed to be maintainable, extensible, and team-friendly.

---

## ✨ Features

- Angular 17 with NgModule architecture
- Lazy-loaded feature modules
- Authentication (Login / Register)
- Route guards (Auth & Guest)
- HTTP interceptors (Auth & Error handling)
- Global error handler
- Centralized notifications using Snackbar
- Shared reusable components (Navbar, Not Found)
- Clean folder structure
- Environment-based configuration
- Ready for backend integration

---

## 🛠 Tech Stack

- **Frontend Framework:** Angular 17
- **Language:** TypeScript
- **UI Library:** Angular Material
- **State Handling:** Service-based (RxJS)
- **Routing:** Angular Router (Lazy Loading)
- **Forms:** Reactive Forms
- **Testing:** Jasmine & Karma
- **Build Tool:** Angular CLI

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── errors/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   └── article/
│   │       ├── pages/
│   │       │   └── dashboard/
│   │       ├── article-routing.module.ts
│   │       └── article.module.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   └── not-found/
│   │   ├── constants/
│   │   ├── directives/
│   │   ├── pipes/
│   │   ├── services/
│   │   └── shared.module.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts │
├── assets/
├── environments/
├── index.html
├── main.ts
└── styles.scss
```

# Rahul Angular Project

## 🚀 Project Setup

### Prerequisites

- Node.js (20.20.0)
- Angular CLI (v17+)

* Install Angular CLI if not installed:

> npm install -g @angular/cli

- Install Dependencies

> npm install

- Run the Application

  > ng serve

- Open your browser at:

> http://localhost:4200

📜 Available Scripts

ng serve: Run the app in development mode

ng build: Build the app for production

ng test: Run unit tests

ng lint: Run lint checks

## Running Application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
