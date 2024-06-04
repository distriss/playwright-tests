# Playwright Test plan for [Hacker News](https://news.ycombinator.com/)

Install node modules by running `npm i`, create and add USERNAME & PASSWORD TO .env, run script with the `node index.js` command.

## User Authentication

- Test login functionality
- Login functionality of valid and invalid inputs
- Logout functionality

## Form validation 

- Validation of registration, login, update user, submission, comment and change password forms.
- Valid data and indvalid data
- Error messages for each invalid input

## Navigation

- Nav Links
- User Auth dependent links
- Article links (verify existence)
- additional links (eg, change password)

## User Behaviour

- Buttons, eg. Upvote/unvote buttons, pagination buttons
- Test entire user behaviour routes, each separately, from front page to eg. logging in, upvoting article, adding comment, updating user data, Search-function

## Responsive design
- Mobile friendly

## Accessibility
- Semantic HTML
- Form Labels
- Alt text
- Keyboard navigation
- Error handling (forms, requests etc)
