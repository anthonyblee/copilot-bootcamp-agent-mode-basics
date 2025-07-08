### :keyboard: Activity: Debugging (part 1 - Add Logging)

In this step, you'll use GitHub Copilot's Agent mode to add logging to some preexisting code to enable better debugging in the next step. This logging infrastructure will help identify issues when we fix runtime errors.

1. Open the **Copilot** chat panel, switch to **Agent** mode and **Claude 4 Sonnet** model using the dropdown menus.

2. :paperclip: Attach the following files to the GitHub Copilot Chat context window to include for code refactoring :paperclip: 
   1. `packages/frontend/src/components/ItemDetails.js`
   2. `packages/frontend/src/utils/ItemService.js`
   3. `packages/backend/src/controllers/ItemDetailsController.js`
   4. `packages/frontend/src/App.js`
   5. `packages/backend/src/app.js`

3. :pencil2: Enter a prompt to get GitHub Copilot to create logging statements to help with debugging the existing errors. Observe and interact with GitHub Copilot as prompts appear to perform actions or request more information. :pencil2:
   
4. :construction: Run the application with `npm run start` in the root directory to observe current state of the application. :construction:
   1. If the app is broken, this is intended as we will soon be having GitHub Copilot help fix compilation and runtime errors. As we only asked GitHub Copilot to add logging it should not have resolved most or any of the issues.
5. :construction: Run unit tests `npm run test` in the root directory to run frontend and backend unit tests :construction:

6. :white_check_mark: Commit all changes and push branch `feature/code-refactoring` up.

### Success Criteria

To complete this exercise successfully, ensure that:
   - Code changes are commited to the `feature/code-refactoring` branch.
   - More console logging is added for the specified files.

If you encounter any issues, you can:
- Double check that the pushed branch is called `feature/code-refactoring`
- Ask Copilot to fix specific problems

### Notes

- :bulb: Frequently, GitHub Copilot will attempt to unify the logging strategy and create an abstraction for logging. If this process is taking too long you can update the prompt above to be more specific like `you want to only add console.log statements...`