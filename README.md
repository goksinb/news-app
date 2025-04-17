### How to Start the App

1. Install Node.js and MongoDB.

2. Clone the repository and run the following in the project folder:

   npm install

3. Create a .env file in the root and add your MongoDB URI:

   MONGO_URI=your-mongodb-connection-url
   PORT=5001

4. Start the server:

   node server.js

### This is a basic blog/news API that allows you to:

    Create new articles (POST /articles)

    Get all articles (GET /articles)

    Get a single article by ID (GET /articles/:id)

    Delete all articles (DELETE /articles)

    Delete one article by ID (DELETE /articles/:id)

### The app includes rate limiting, form validation, and logging for safety.
