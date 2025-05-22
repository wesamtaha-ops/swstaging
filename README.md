# Votly SaaS - Frontend

Votly SaaS is a web application built using React and TypeScript. This repository contains the frontend codebase for the project. Contributions and collaboration from developers are welcome! Please adhere to the guidelines below to maintain a clean and organized codebase.

## Table of Contents
- [Getting Started](#getting-started)
- [Branching Structure](#branching-structure)
- [Contributing](#contributing)
- [Project Setup](#project-setup)
- [Scripts](#scripts)
- [Technologies Used](#technologies-used)

## Getting Started

To get started with the project, clone the repository and install the required dependencies.

```bash
# Clone the repository
git clone https://github.com/sammarisalah/survey-frontend.git

# Navigate to the project directory
cd survey-frontend

# Install dependencies
npm install
```

## Branching Structure

To ensure an organized development workflow, all developers are required to follow the branching structure below:

### Branch Naming Convention
- **`main`**: This is the stable branch containing production-ready code. Direct commits to this branch are prohibited.
- **`develop`**: This branch contains the latest merged features for staging or testing. It serves as the main integration branch.
- **Feature Branches**:
  - Use the following naming convention for feature branches:
    ```
    feature/<developer-name>/<feature-name>
    ```
    Example: `feature/john/add-login-page`
- **Bugfix Branches**:
  - Use the following naming convention for bug fixes:
    ```
    bugfix/<developer-name>/<bug-description>
    ```
    Example: `bugfix/jane/fix-navbar-layout`
- **Hotfix Branches**:
  - Use the following naming convention for urgent production fixes:
    ```
    hotfix/<developer-name>/<fix-description>
    ```
    Example: `hotfix/alex/fix-critical-login-error`

### Workflow
1. Create a new branch from `develop` for your feature or bug fix.
2. Commit your changes to the branch.
3. Push the branch to the remote repository.
4. Create a pull request (PR) to merge your branch into `develop`.
5. Wait for code reviews and approvals before merging.

## Contributing

We welcome contributions to this project! Please ensure you:
1. Follow the branching structure guidelines mentioned above.
2. Test your changes thoroughly before creating a pull request.
3. Add comments and documentation where necessary.

### Code Style
- Follow the existing code style and structure.
- Use meaningful commit messages.

## Project Setup

### Environment Variables
Create a `.env` file in the root of the project to define environment-specific variables. Refer to `.env.example` for required variables.

### Running the Development Server
```bash
npm start
```
The application will be available at `http://localhost:3000`.

### Building the Project
```bash
npm run build
```
The production-ready build will be generated in the `build` directory.

## Scripts

Here are the available npm scripts:

- **`npm start`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Runs tests.
- **`npm run lint`**: Lints the codebase.
- **`npm run format`**: Formats the codebase.

## Technologies Used

- **React**: Frontend library.
- **TypeScript**: Type-safe JavaScript.
- **Redux**: State management.
- **React Router**: Client-side routing.
- **Axios**: HTTP client.
- **Styled Components**: CSS-in-JS for styling.
- **ESLint** and **Prettier**: For linting and formatting.

---

Thank you for contributing to Votly SaaS! 😊
# swstaging
