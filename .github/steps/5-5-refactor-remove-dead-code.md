### :keyboard: Activity: Refactoring (part 2 - remove dead code)

In this step, you'll use GitHub Copilot's Agent mode to refactor some preexisting code by removing some dead code. This completes the refactoring process by cleaning up unused code after the parameter simplification.

1. Open the **Copilot** chat panel, switch to **Agent** mode and **Claude 3.7 Sonnet** model using the dropdown menus.

2. :paperclip: Attach the following files to the GitHub Copilot Chat context window to include for code refactoring :paperclip:
   1. `packages/frontend/src/components/ItemDetails.js`
   2. `packages/frontend/src/utils/ItemService.js`
   3. `packages/backend/src/controllers/ItemDetailsController.js`

3. :pencil2: Enter a prompt to get GitHub Copilot to refactor the code with the goal of removing dead and unused code: :pencil2: 
   
4. :mag: Run the application with `npm run start` in the root directory to test the functionality.

   - All functionality should continue to work
   - All unit tests `npm run test` should continue to work

5. :mag: Check if the code has been refactored to your specification (all dead code removed in the attached files)

6. :repeat: If the codebase has not yet been refactored or something is now broken, keep asking GitHub Copilot to refactor anything missed or resolve issues observed.

7. :white_check_mark: When everything succeeds, commit all changes and push branch `feature/code-refactoring` up.

### Success Criteria

To complete this exercise successfully, ensure that:
   - Code changes are commited to the `feature/code-refactoring` branch.
   - All dead code is removed for the specified files.

If you encounter any issues, you can:
- Double check that the pushed branch is called `feature/code-refactoring`
- Ask Copilot to fix specific problems