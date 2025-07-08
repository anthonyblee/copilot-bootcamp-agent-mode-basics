### :keyboard: Activity: Adding MUI instructions and updating docs

In this exercise, you'll use GitHub Copilot's Agent mode to add React's component library, and create a new component with it.

### :keyboard: Activity: Create a table without guiding copilot to use MUI

We will first create a table without explicitly instructing copilot to use the MUI component library.

1. :pencil2: Create a new branch called `feature/mui` based off of your `feature/intro` branch. :pencil2:

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu.

1. In the Copilot chat input field, use your own words to ask Copilot to convert the item-section to a table.

   - For example, you might say: "Convert the item-section to a table".
   - The exact wording is up to you—just make sure your intent is clear!

1. Copilot will analyze your codebase and implement:
   - Updating the `App.js` to implement a table in place of the current `item-section`

1. When Copilot finishes making the changes, review what was modified:
   - `App.js`

1. Run the application with `npm run start` in the root directory to test the new functionality.

### Success Criteria

To complete this exercise successfully, ensure that:
   - A new `feature/mui` branch is pushed
   - `App.js` was updated with a vanilla HTML `table` implementation

If you encounter any issues, you can:
- Double check that the newly pushed branch is called `feature/mui`
- Ask Copilot to fix specific problems
- Check the developer console for any errors
