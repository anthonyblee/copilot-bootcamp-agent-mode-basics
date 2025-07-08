### :keyboard: Activity: Adding Unit Tests for Frontend Delete Functionality

In this exercise, you'll use GitHub Copilot's Agent mode to implement frontend unit tests for delete functionality.

### :keyboard: Activity: Use Agent mode to create unit tests for the delete functionality

Let's add the frontend unit tests for the delete functionality created in the previous lessons.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to add unit tests for delete functionality.
   - For example, you might say: _"Add frontend unit tests for the delete functionality"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and add unit tests for the delete button functionality in packages/frontend/src/__tests__/app.test.js.

1. When Copilot finishes making the changes, review what was modified:
   - In the frontend (`packages/frontend/src/__tests__/App.test.js`), you should see unit tests added for delete button functionality

1. When prompted by Copilot, run the frontend tests to make sure they all pass. If you see any errors ask Copilot to fix the errors.

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.

### Success Criteria

To complete this exercise successfully:
- The codebase should have unit tests for delete button functionality in `packages/backend/__tests__/app.test.js` that runs successfully.
- You may need to move and rename the test file generated to the location specified above for the validations to succeed.

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors