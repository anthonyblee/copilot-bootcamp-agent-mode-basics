# :keyboard: Activity: Setting Up Linting for the Project

In this exercise, you'll use GitHub Copilot's Agent mode to set up linting for your project. Linting helps maintain code quality and consistency by automatically checking your code for style and syntax issues.

## What is Linting?

**Linting** is the process of running a program that analyzes your code for potential errors, stylistic issues, and deviations from defined coding standards. It helps catch bugs early and enforces a consistent code style across the project.

## :keyboard: Activity: Use Agent mode to set up linting

Let's add linting to our project using ESLint and Prettier. This will involve updating configuration files, installing dependencies, and adding scripts to the project.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to set up linting for the project.

   - For example, you might say: _"Set up ESLint and Prettier for this monorepo"_ or _"Add linting and formatting to both frontend and backend packages"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and implement:

   - ESLint and Prettier configuration files at the root and/or in each package
   - Installation of necessary dependencies
   - Addition of `lint` and `lint:fix` scripts to `package.json` files

1. When Copilot finishes making the changes, review what was modified:

   - You should see new or updated `.eslintrc`, `.eslintignore`, `.prettierrc`, and `.prettierignore` files
   - The `package.json` files should have new scripts and dependencies

1. Next, use Copilot Agent to run the linter and automatically fix any issues it finds. It may have already done this for you. If not, you can do this by asking Copilot to run the appropriate lint or lint:fix command for you.

   - For example, you might say: _"Run the linter and fix all lint errors in the project"_ or _"Execute npm run lint:fix to resolve linting issues automatically"_.

1. Commit and push your changes to the `feature/intro` branch.

## Success Criteria

To complete this exercise successfully:

- ESLint and Prettier are set up for both frontend and backend
- Linting scripts are available in the root and package `package.json` files
- The codebase passes linting with no errors

If you encounter any issues, you can:

- Ask Copilot to fix specific linting errors
- Review the ESLint and Prettier documentation for troubleshooting tips
