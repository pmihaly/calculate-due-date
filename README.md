# calculate-due-date

A function that calculates a due date of a task from a submit date and a turnaround time in working hours.

Having no UI, the solution is located in the **libs** directory.

This project sports 100% coverage (TDD), no mutations, and side-effects.

To achieve this, I took a recursive approach, so the solution will not scale along turnaround times as each day is a new recursive call, and nodejs provides no tail call optimization.

Install dependencies: `nvm use && yarn`

Run tests: `npx jest --coverage`

What I would fix:

- Name of tests: `should calculate due date when...` -> `should return due date within working hours when...`
- Maybe inline the `calculateDueDateTail` function into `calculateDueDate`
