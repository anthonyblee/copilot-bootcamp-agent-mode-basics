### :keyboard: Activity: Debugging - Fix runtime errors

In this step, you'll use GitHub Copilot's Agent mode to fix some runtime errors. Use the logging added in the previous step to help identify and resolve these issues.

1. Open the **Copilot** chat panel, switch to **Agent** mode and **Claude 4 Sonnet** model using the dropdown menus.

2. :paperclip: Attach the following files to the GitHub Copilot Chat context window to include for debugging :paperclip: 
   1. `packages/frontend/src/components/ItemDetails.js`
   2. `packages/frontend/src/utils/ItemService.js`
   3. `packages/backend/src/controllers/ItemDetailsController.js`
   4. `packages/frontend/src/App.js`
   5. `packages/backend/src/app.js`

3. :pencil2: Enter a prompt to get GitHub Copilot to fix the code and include the appropriate context. Appropriate context may include the following:

   | Type of Context | Example |
   | - | - |
   | Error messages | `Uncaught ReferenceError: undefinedObject is not defined at <anonymous>1:1 ...` |
   | Type of Error | `... the following error observed in the browser console / CLI / unit tests ...`
   | Situation | `When I click on this section in the UI... such and such happens / <paste error> ...` |
   
4. :mag: Run the application with `npm run start` in the root directory to test the functionality.
   
   The end goal is to have the application compiling successfully and with the application functioning in terms of viewing, adding, editing, and deleting items.

5. :mag: Run the unit tests with `npm run test` in the root directory. All unit tests should continue to pass.

6. :repeat: If the application is still erroring out, keep asking GitHub Copilot to resolve issues observed in the CLI terminal and browser console logs and paste specific error messages so it has the appropriate context.

7. :white_check_mark: When everything succeeds, commit all changes and push branch `feature/code-refactoring` up.

### Success Criteria

To complete this exercise successfully, ensure that:
   - Code changes are commited to the `feature/code-refactoring` branch.
   - All compilation and runtime errors are resolved.

If you encounter any issues, you can:
- Double check that the pushed branch is called `feature/code-refactoring`
- Ask Copilot to fix specific problems