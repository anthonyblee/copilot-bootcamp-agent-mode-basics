### :keyboard: Activity: Update Unit Tests for Backend Delete API

In this exercise, you'll use GitHub Copilot's Agent mode to implement backend changes and then update unit tests for delete api.

### :keyboard: Activity: Use Agent mode to update unit tests for the delete api

Let's update the backend unit tests for the delete api created in the previous lessons.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to update the delete api to add a condition for eg, only allow deleting items that are 5 days and older.
   - For example, you might say: _"Update the delete endpoint to only allow deleting items that are 5 days and older"_.
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will start analysing the code, Hit Continue on the prompts to allow Copilot to complete the analysis.

1. When Copilot finishes making the changes, review what was modified:
   - In the backend (`packages/backend/src/app.js`), you should see a new IF condition added in the delete endpoint. Verify that your provided requirement is met.

1. When prompted by Copilot, run the existing backend tests to see if they fail.

1. When prompted allow Copilot to fix the unit test. Verify the updates to the unit test and run them again.

1. If prompted, continue to update the frontend functionlity & associated frontend unit tests as well. Make sure to run them and verify they all pass.

1. Keep the changes that copilot implemented.

1. Commit and push to the `feature/test` branch.

### Success Criteria

To complete this exercise successfully:
- The backend DELETE endpoint should have a new IF condition.
- The backend unit tests for DELETE endpoint should be updated and run successfully.

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors