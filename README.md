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
- [ ] Add admin login for posting news
- [ ] Add PUT endpoint to update existing articles
- [ ] Review and either remove or implement categories
- [ ] Add payment system for subscriptions
- [ ] Add notifications for newly published articles

  ## Core API Features (Completed)

  - [X] Set up GET, POST, and DELETE endpoints
  - [X] Fetch individual articles
  - [X] Delete individual articles
  - [X] Track POST and DELETE actions with logs
  - [X] Serve a performance report and explain optimization process
  - [X] Display privacy policy and comply with basic GDPR considerations
  - [X] Ensure stateless API with persistent database

  ## Tracking & Reporting (Completed)

  - [X] Implement privacy-conscious user action tracking
  - [X] Include a “Privacy Note” in frontend
  - [X] Write security report on vulnerabilities and mitigations
  - [X] Write accessibility & SEO explanation

  ## Accessibility (Completed)

  - [X] Use htmlFor/for to improve form usability
  - [X] Ensure accessible markup throughout the app
