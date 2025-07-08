# Welcome to the Copilot Bootcamp Lesson 4 - Testing with GitHub CoPilot! In this first step, you'll remove all existing unit tests.

In this exercise, you'll use GitHub Copilot's Agent mode to all existing unit tests.

### :keyboard: Activity: Delete the backend unit tests

1. :pencil2: Create a new branch called `feature/test` based off of your `feature/mui` branch. :pencil2:
1. Open the File Explorer and navigate to packages/backend/__tests__
1. Right click on the app.test.js and select Delete
1. Select 'Move to Recycle Bin' in the confirmation window

### :keyboard: Activity: Delete the frontend unit tests

1. In the Copilot chat input field, use your own words to ask Copilot to delete all existing unit tests.
   - For example, you might say: _"Delete all unit tests"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and:
   - remove the frontend tests in packages/frontend/src/__tests__/App.test.js
   - remove the backend tests in packages/backend/__tests__/app.test.js

1. When Copilot finishes making the changes, review what was modified:
   - The backend test file (`packages/backend/__tests__/app.test.js`), should be empty now
   - The frontend test file (`packages/frontend/src/__tests__/App.test.js`), should be empty now

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.


### Success Criteria

To complete this exercise successfully:
- A new `feature/test` branch is pushed based on the branch `feature/mui`
- The packages/backend/__tests__/app.test.js should be empty
- The packages/backend/src/__tests__/App.test.js folder should be empty

If you encounter any issues, you can:
- Double check that the newly pushed branch is called `feature/test`
- Ask Copilot to fix specific problems
- Check the developer console for any errors