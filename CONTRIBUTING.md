# Contributing to WebExt Theme Engine

Thank you for your interest in contributing to WebExt Theme Engine! This document provides guidelines for contributing to the project.

## How to Fork and Clone

1. **Fork the repository**: Click the "Fork" button on the [GitHub repository page](https://github.com/theluckystrike/webext-theme-engine)

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-theme-engine.git
   cd webext-theme-engine
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/theluckystrike/webext-theme-engine.git
   ```

4. **Keep your fork synced**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Run tests** (if available):
   ```bash
   npm test
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

## Code Style Guidelines

- **JavaScript/TypeScript**: Follow the existing code style in the project
- **Formatting**: Use consistent indentation (2 or 4 spaces as per project)
- **Naming**: Use descriptive names for variables, functions, and classes
- **Comments**: Add comments for complex logic and public APIs
- **Commits**: Write clear, concise commit messages describing your changes

## How to Submit PRs

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. **Make your changes**: Implement your feature or bug fix

3. **Test your changes**: Ensure all tests pass and the project builds successfully

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**: 
   - Go to the [original repository](https://github.com/theluckystrike/webext-theme-engine)
   - Click "New Pull Request"
   - Select your branch and submit

7. **Address review feedback**: Make changes as requested by reviewers

## Issue Reporting Guidelines

When reporting issues, please include:

1. **Clear title**: Describe the problem concisely
2. **Description**: Detailed explanation of the issue
3. **Steps to reproduce**: Numbered list of steps
4. **Expected behavior**: What you expected to happen
5. **Actual behavior**: What actually happened
6. **Environment**: OS, browser, version info
7. **Screenshots**: If applicable
8. **Logs**: Any relevant error messages

## License

By contributing to WebExt Theme Engine, you agree that your contributions will be licensed under the project's license.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)
