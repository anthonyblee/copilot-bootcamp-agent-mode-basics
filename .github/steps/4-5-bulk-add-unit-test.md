### :keyboard: Activity: Bulk Add Unit Tests 

In this exercise, you'll use GitHub Copilot's Agent mode to add unit tests in bulk.

### :keyboard: Activity: Use Agent mode to create unit tests for the uncovered lines of code

Let's add more unit tests for our codebase.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to add unit tests for uncovered lines.
   - For example, you might say: _"Add unit tests for backend APIs that might not be fully covered"_ or _"Add unit tests for frontend functionalities that might not be covered"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and add additonal unit tests.

1. When Copilot finishes making the changes, review what was modified:
   - In the backend (`packages/backend/__tests__/app.test.js`), you should see unit tests added for get & post endpoints
   - In the frontend (`packages/frontend/src/__tests__/App.test.js`), you should see unit tests added for form submission

1. When prompted by Copilot, run the unit tests to make sure they all pass. If you see any errors ask Copilot to fix the errors.

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.

### Success Criteria

To complete this exercise successfully:
- The codebase should have unit tests that runs successfully.

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors