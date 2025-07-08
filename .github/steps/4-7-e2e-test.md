### :keyboard: Activity: Adding End-to-End Tests using Playwright

In this exercise, you'll use GitHub Copilot's Agent mode to implement end-to-end tests for delete item functionality.

### :keyboard: Activity: Use Agent mode to create end-to-end tests

Let's add end-to-end tests for the delete functionality.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to add end-to-end tests for delete functionality using playwright.
   - For example, you might say: _"Add e2e tests for create, get and delete item functionality using playwright"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will first install required packages for playwright, analyze your codebase and add required tests in `packages/frontend/e2e/delete.spec.js`.

1. When Copilot finishes making the changes, review what was modified:
   - In the frontend (`packages/frontend/e2e/delete.spec.js`), you should see comprehensive tests added for handleDelete function

1. When prompted by Copilot, run the frontend tests to make sure they all pass. If you see any errors ask Copilot to fix the errors.

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.

### Success Criteria

To complete this exercise successfully:
- The codebase should have more tests added to handleDelete function in `packages/frontend/e2e/delete.spec.js` that runs successfully.

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors
- Remove the 5-day age restriction from delete functionality to make the tests simpler