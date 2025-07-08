### :keyboard: Activity: Improve code coverage

In this exercise, you'll use GitHub Copilot's Agent mode to improve code coverage of a specific file.

### :keyboard: Activity: Use Agent mode to improve code coverage of a specific file

Let's add more unit tests for our codebase.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to add unit tests for uncovered lines of a specific file.
   - For example, you might say: _"Add full coverage for app.js"_.
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
- The backend code coverage should be above 80%
- The frontend code coverage should be above 80%

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors