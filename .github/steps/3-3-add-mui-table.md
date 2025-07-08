### :keyboard: Activity: Adding MUI and updating our item's table

In this exercise, you'll use GitHub Copilot's Agent mode to add in MUI dependencies, and then convert our item-section to a TableContainer (native MUI component).

### :keyboard: Activity: Use Agent mode to add MUI dependencies

Let's add the component library to our application. This will add the appropriate dependencies to our `./packages/frontend/package.json`, as well as setup our App.js s to pull in the component library.

1. Open the **Copilot** chat panel and switch to **Agent** mode using the dropdown menu. Be sure to add the `frontend/` folder to the context view.

2. Use the following prompt to ask Copilot to add the MUI component library:

   > ![Static Badge](https://img.shields.io/badge/-Prompt-text?style=social&logo=github%20copilot)
   >
   > ```prompt
   > Convert our item-section to a table
   > ```

3. Copilot will analyze your codebase and implement:
   - updating `package.json` to add and install MUI dependencies
   - update `App.js` to import MUI libraries
   - convert the section component to use a `TableContainer`

4. When Copilot finishes making the changes, review what was modified:
   - `package.json`
   - `App.js`

5. Run the application with `npm run start` in the root directory to test the new functionality.

### Success Criteria

To complete this exercise successfully:
- Ensure that references are updated to use MUI Table components
- Ensure that the app loads successfully and has a material look and feel
- You should additionally see MUI Table out of the box features (like sorting) now available

If you encounter any issues, you can:
- Ask Copilot to fix specific problems
- Check the developer console for any errors
