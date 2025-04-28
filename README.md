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

  - [✔] Set up GET, POST, and DELETE endpoints
  - [✔] Fetch individual articles
  - [✔] Delete individual articles
  - [✔] Track POST and DELETE actions with logs
  - [✔] Serve a performance report and explain optimization process
  - [✔] Display privacy policy and comply with basic GDPR considerations
  - [✔] Ensure stateless API with persistent database

  ## Tracking & Reporting (Completed)

  - [✔] Implement privacy-conscious user action tracking
  - [✔] Include a “Privacy Note” in frontend
  - [✔] Write security report on vulnerabilities and mitigations
  - [✔] Write accessibility & SEO explanation

  ## Accessibility (Completed)

  - [✔] Use htmlFor/for to improve form usability
  - [✔] Ensure accessible markup throughout the app
