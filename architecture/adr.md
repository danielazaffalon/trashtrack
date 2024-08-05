# Architectural Decision Record (ADR)

## ADR 001: Use of Angular Framework for Frontend Development

### Status
Accepted

### Context
We need a robust, scalable, and maintainable framework for building the frontend of the TrashTrack application. The application requires efficient handling of user interfaces, state management, and integration with backend services.

### Decision
We have chosen Angular as the framework for the frontend development of the TrashTrack project.

### Consequences
- **Pros:**
  - **Component-based architecture:** Facilitates reusability and maintainability.
  - **Strong community support:** Extensive documentation and third-party libraries.
  - **Built-in tools:** Includes CLI, RxJS, and Angular Material for efficient development.
  - **TypeScript support:** Provides static typing, enhancing code quality and developer productivity.

- **Cons:**
  - **Learning curve:** Steeper learning curve compared to some other frontend frameworks.
  - **Bundle size:** Angular applications can have larger bundle sizes if not optimized properly.

---

## ADR 002: Use of Ionic Framework for Cross-Platform Mobile Development

### Status
Accepted

### Context
We need to develop a mobile application that works seamlessly across both iOS and Android platforms. The application should have a native look and feel and should leverage web technologies for faster development cycles.

### Decision
We have chosen the Ionic Framework for cross-platform mobile development.

### Consequences
- **Pros:**
  - **Cross-platform capabilities:** Single codebase for both iOS and Android.
  - **Integration with Angular:** Simplifies development by leveraging existing Angular components.
  - **Rich UI components:** Provides pre-built UI components that mimic native behavior.

- **Cons:**
  - **Performance:** May not be as performant as fully native applications for certain use cases.
  - **Dependency on web view:** Relies on WebView for rendering, which might affect performance and access to some native functionalities.

---

## ADR 003: Firebase as Backend-as-a-Service (BaaS)

### Status
Accepted

### Context
We need a backend solution that allows for real-time data synchronization, user authentication, and scalable cloud storage without the need to manage infrastructure.

### Decision
We have chosen Firebase as the backend-as-a-service for the TrashTrack project.

### Consequences
- **Pros:**
  - **Real-time database:** Allows for real-time data updates and synchronization.
  - **Authentication:** Provides out-of-the-box authentication solutions.
  - **Scalability:** Automatically scales with the application's growth.
  - **Hosting:** Simplifies deployment with Firebase Hosting.

- **Cons:**
  - **Vendor lock-in:** Dependency on Firebase's services and pricing model.
  - **Limited querying capabilities:** Firestore querying capabilities are limited compared to traditional SQL databases.

---

## ADR 004: Use of SCSS for Styling

### Status
Accepted

### Context
We need a powerful and flexible preprocessor to manage the application's styles, allowing for variables, nesting, and modularization.

### Decision
We have chosen SCSS (Sass) for styling the TrashTrack application.

### Consequences
- **Pros:**
  - **Variables and Nesting:** Enhances CSS with variables, nested rules, and mixins.
  - **Modularization:** Supports partials and imports for better organization.
  - **Community support:** Widely adopted with extensive community resources.

- **Cons:**
  - **Build process:** Requires a build step to compile SCSS to CSS.
  - **Complexity:** Can add complexity to the project if not managed properly.

---

## ADR 005: Modularization of Components, Services, and Pages

### Status
Accepted

### Context
To maintain a clean and organized codebase, it's essential to modularize different parts of the application such as components, services, and pages.

### Decision
We have divided the application into distinct modules, components, services, and pages.

### Structure
- **Components:**
  - `app.component.ts`: Main application component.
  - Shared components like `header.component.ts`, `sidemenu.component.ts`, and `incident-form.component.ts`.
  - Filter components like `containers-filter.component.ts`.

- **Services:**
  - `auth.service.ts`: Manages authentication.
  - `containers.service.ts`: Handles container-related operations.
  - `incidents.service.ts`: Manages incident reports.
  - `photo.service.ts`: Handles photo-related functionalities.
  - `storage.service.ts`: Manages storage operations.
  - `user-settings.service.ts`: Manages user settings.

- **Pages:**
  - Public pages: `login.page.ts`, `register.page.ts`.
  - Private pages: `tab1.page.ts`, `tab2.page.ts`, `tab3.page.ts`, `tabs.page.ts`, `usersettings.page.ts`.

### Consequences
- **Pros:**
  - **Code organization:** Clear separation of concerns.
  - **Reusability:** Components and services can be reused across different parts of the application.
  - **Maintainability:** Easier to manage and update specific parts of the application.
  - **Scalability:** Facilitates the addition of new features without cluttering the codebase.

- **Cons:**
  - **Initial setup:** Requires careful planning and initial setup to organize the modules effectively.
  - **Inter-module communication:** Can become complex if too many dependencies are created between modules.

---

This document captures the key architectural decisions made for the TrashTrack project. It should be updated regularly to reflect any changes or new decisions.

---
``` &#8203;:citation[oaicite:0]{index=0}&#8203;
