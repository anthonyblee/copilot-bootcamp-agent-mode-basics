### :keyboard: Activity: Adding MUI instructions and updating docs

In this exercise, you'll guide GitHub Copilot's Agent mode to offer precendence to MUI components.

### :keyboard: Activity: Update copilot instructions to leverage MUI

To more precisely guide copilot, we will need to add in MUI instructions, and update copilot instructions to reference them.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

2. In the Copilot chat input field, use your own words to add mui instructions and update copilot instruction to consume the newly created mui instructions.

   - For example, you might say: "Add a new instructions file to use MUI called mui-guidelines.md and update copilot instructions to reference it".
   - Note: The test will assert that `mui-guidelines.md` exists, so the naming of that file is important!
   - The exact wording is up to you—just make sure your intent is clear!

3. Copilot will analyze your codebase and implement:
   - Adding a new instruction file called `mui-guidelines.md`
   - Update copilot-instructions.md to reference `mui-guidelines.md`

4. When Copilot finishes making the changes, review what was modified:
   - `mui-guidelines.md` was created
   - `copilot-instructions.md` was updated

5. Run the application with `npm run start` in the root directory to test the new functionality.

### Success Criteria

To complete this exercise successfully, ensure that:
   - `mui-guidelines.md` was created
   - `copilot-instructions.md` was updated to reference `mui-guidelines.md`

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors
