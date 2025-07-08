# Lesson 5 - Refactoring and Debugging Start

### :keyboard: Activity: Checkout code to debug and refactor

In this lesson 5, you'll use GitHub Copilot's Agent mode to:
  - first: debug some compile and runtime errors, and then
  - second: refactor the code to make it more maintainable 

But first we will need to check out some poorly written code that needs some fixing and refactoring.

### :keyboard: Activity: Checkout existing branch and push to new branch for modifications

1. :arrow_down: Checkout the branch `lesson-5-start` :arrow_down:

2. :arrow_down: Install npm dependencies for this checked out branch `npm run install:all` :arrow_down:

3. :pencil2: Create a new branch off this branch called `feature/code-refactoring`. :pencil2:
   
   :exclamation: IMPORTANT: Branch needs to be exactly as specified or you will not be able to continue.

4. :arrow_up: Push branch `feature/code-refactoring`. :arrow_up:
5. :construction: Run the application with `npm run start` in the root directory to observe current state of the application. :construction:
   1. If the app is broken, this is intended as we will soon be having GitHub Copilot help fix compilation and runtime errors.
6. :construction: Run unit tests `npm run test` in the root directory to run frontend and backend unit tests :construction:

### Success Criteria

To complete this exercise successfully, ensure that:
   - A new `feature/code-refactoring` branch is pushed based on the branch `lesson-5-start`

If you encounter any issues, you can:
- Double check that the newly pushed branch is called `feature/code-refactoring`
- Ask Copilot to fix specific problems