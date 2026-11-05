# Bug Hunt

(difficulty: 🔥🔥)

Bookshelf is a small React app. It was handed over to you with the note "works mostly". It does not. There are **four bugs** in it, and the existing tests only point at some of them.

## What the app should do

1. The list shows all books. A book has a title, an author, a genre and a rating (0 means "not rated").
2. The search field finds books by title, **regardless of upper and lower case** and ignoring spaces at the start and the end.
3. The genre select shows only books of that genre. "All genres" shows everything.
4. "Mark as read" / "Mark as unread" changes the status of **that one book** and updates the screen immediately.
5. "Remove" deletes **that one book**, also when a search or genre filter is active.
6. The line above the list shows how many books are read and the **average rating of the rated books** (books with the rating 0 do not count). If no book is rated, it shows "–".

## Tasks

Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`), so you can always see what changed with `git diff` and go back with `git restore .`.

### Part 1: Chat AI (about 20 minutes)

1. Open [claude.ai](https://claude.ai) in the browser and start a new chat. **Do not use Claude Code yet.**
2. Copy the relevant files into the chat (`src/books.ts`, the components, the tests) and ask for bugs. Use the list "What the app should do" as the specification.
3. Apply the suggestions **yourself**, one by one. After each change run `npm run test:run` and look at the app in the browser.
4. Write down: How many bugs did you find with the chat? What was annoying?

Restore the project for part 2 (`git restore .`).

### Part 2: Coding agent (about 30 minutes)

1. Start Claude Code in the project folder: `claude`. Check the mode below the input: it has to be the **Manual mode**. If it is not, switch with `Shift+Tab` or restart with `claude --permission-mode manual`. Do not use any other mode.
2. Ask it to find and fix the bugs. Do not tell it where they are. Use the specification.
3. Read **every** permission prompt and every diff before you approve. Fill in your permission log (see below).
4. After each fix, check it yourself in the browser and with `npm run test:run`.

### Permission log

Keep a table while you work with the agent:

| Action Claude wanted to take | What would it do? | My decision | Why? |
| ---------------------------- | ----------------- | ----------- | ---- |

Write down at least five entries. Include one where you said no, or one where you stopped and asked yourself "do I understand this?".

### Part 3: Compare

1. How many of the four bugs did you find with the chat, how many with the agent?
2. Did the agent change a test to make it pass? Check `git diff` for the test files.
3. Which bug was hardest to find, and why?
4. Add a test for each bug the existing tests did not cover. Let the agent write them, then read them. Break the fix on purpose, the test must turn red.

### Bonus

Ask the agent to explain **why** each bug happened, and what you would have to check in a code review to catch it.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
