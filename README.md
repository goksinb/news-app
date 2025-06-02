### This is a basic blog/news API that allows you to:

Create new articles (POST /articles)

Get all articles (GET /articles)

Get a single article by ID (GET /articles/:id)

Delete all articles (DELETE /articles)

Delete one article by ID (DELETE /articles/:id)

### How to Start the App

1. Clone the repository and run the following in the project folder:

   npm install

2. Install Node.js and MongoDB on both folders.

3. Create a .env file in the root and add your MongoDB URI:

   MONGO_URI=your-mongodb-connection-url
   PORT=5001

4. Start the server:

   node server.js

## Backlog / Roadmap

- [ ] Add user authentication
- [ ] Implement search functionality
- [ ] Improve mobile responsiveness
- [ ] Add search & filter functionality
- [x] Add admin login for posting news
- [ ] Add PUT endpoint to update existing articles
- [ ] Review and implement categories
- [ ] Add payment system for subscriptions
- [ ] Add notifications for newly published articles

  ## Core API Features (Completed)

  - [x] Set up GET, POST, and DELETE endpoints
  - [x] Fetch individual articles
  - [x] Delete individual articles
  - [x] Track POST and DELETE actions with logs
  - [x] Serve a performance report and explain optimization process
  - [x] Display privacy policy and comply with basic GDPR considerations
  - [x] Ensure stateless API with persistent database

  ## Tracking & Reporting (Completed)

  - [x] Implement privacy-conscious user action tracking
  - [x] Include a “Privacy Note” in frontend
  - [x] Write security report on vulnerabilities and mitigations
  - [x] Write accessibility & SEO explanation

  ## Accessibility (Completed)

  - [x] Use htmlFor/for to improve form usability
  - [x] Ensure accessible markup throughout the app
