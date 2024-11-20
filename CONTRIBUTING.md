# Contributing to Expo React Native Paper

We are grateful for your interest in contributing to the **Expo React Native Paper** project! Contributions are essential for the project's growth and success. This document outlines the guidelines for contributing to ensure a smooth and collaborative development process.

## Code of Conduct

Please familiarize yourself with and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Here, we aim to foster an inclusive and respectful community for everyone.

## Getting Started

### Prerequisites

Ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Setting Up Your Development Environment

1. **Fork the Repository**

   Fork the `expo-react-native-paper` repository from [GitHub](https://github.com/youzarsiph/expo-react-native-paper).

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/expo-react-native-paper.git
   cd expo-react-native-paper
   ```

3. **Customize the Project**

   Update the application name in `package.json`:

   ```jsonc
   {
     "name": "your-app-name",
     ...
   }
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Start the Development Server**

   ```bash
   npm start
   ```

## Contribution Guidelines

### Branching Strategy

We use a [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching strategy. All contributions should be made in new branches based off the **develop** branch.

1. **Create a New Branch**

   ```bash
   git checkout -b feature/AmazingFeature develop
   ```

### Commit Guidelines

- Use clear and descriptive commit messages.
- Refer to issues in your commit messages using `#issueNumber`.
- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for better readability and maintainability.

```markdown
feat: add navigation using Expo Router
fix: resolve issue with theme initialization #12
docs: update README with contribution steps
```

### Pull Request Guidelines

1. **Ensure Your Branch is Up-to-Date**

   Merge the latest changes from the **develop** branch before submitting a pull request.

   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/AmazingFeature
   git merge develop
   ```

2. **Run Linters and Tests**

   Ensure your changes pass all automated checks.

   ```bash
   npm run lint
   npm test
   ```

3. **Open a Pull Request**

   - Open a pull request in the original repository with a clear title and description.
   - Reference any issues your pull request addresses with `#issueNumber`.
   - Include a summary of your changes and any related information.

## Code Quality and Standards

We strictly adhere to code quality and coding standards to maintain a high-quality codebase.

- **CodeQL**: Security scans for identifying vulnerabilities.
- **ESLint**: JavaScript linting for consistency.
- **Prettier**: Code formatting for uniformity.

Ensure your code adheres to these standards before submitting a pull request.

## Reporting Bugs

If you encounter a bug, please report it using the [issue tracker](https://github.com/youzarsiph/expo-react-native-paper/issues).

- **Describe the bug in detail**.
- **Provide steps to reproduce the bug**.
- **Include relevant error messages and screenshots**.
- **Indicate your operating system, device, and version**.

## Suggesting Features

If you have a new idea or feature request, please create a new issue on the [issue tracker](https://github.com/youzarsiph/expo-react-native-paper/issues).

- **Provide a clear and concise description of the feature**.
- **Explain the benefits and how it fits into the project**.
- **Discuss any potential concerns or drawbacks**.

## Contact

For any questions or feedback, feel free to reach out to the project maintainers:

- [Youzarsiph](https://github.com/youzarsiph)

Thank you for your contributions! We are excited to see what you bring to the project.
