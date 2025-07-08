### :keyboard: Activity: Adding Integration Tests

In this exercise, you'll use GitHub Copilot's Agent mode to implement integration tests for delete item functionality.

### :keyboard: Activity: Use Agent mode to create integration tests

Let's add integration tests for the delete functionality.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to add integration tests for delete functionality.
   - For example, you might say: _"Add integration tests for delete item functionality. Setup mock data for the tests"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and add required tests in packages/frontend/src/__tests__/App.test.js.

1. When Copilot finishes making the changes, review what was modified:
   - In the frontend (`packages/frontend/src/__tests__/App.test.js`), you should see comprehensive tests added for handleDelete function

1. When prompted by Copilot, run the frontend tests to make sure they all pass. If you see any errors ask Copilot to fix the errors.

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.

### Success Criteria

To complete this exercise successfully:
- The codebase should have more tests added to handleDelete function in `packages/frontend/src/__tests__/App.test.js` that runs successfully.

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors
- Remove the 5-day restriction 