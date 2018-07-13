About the App:
This app is built on React with Redux as a state manager. It uses React Router to handle the user flow and to allow for toggling between the different views seamlessly. It uses the Internet Game Database (IGDB) API (https://igdb.github.io/api/) to search for games then find games that match a specific set of criteria between genres, themes, and player perspectives chosen by the user. Because IGDB only accepts CORS requests for premium users, the app runs in local development on a custom Express server, using webpack-dev-middleware to feed the JS bundle to it. The React code then sends AJAX calls to the server, which acts as a proxy to reach out to the API.

The styles are 

Commands:
- To view the app, run "npm install" followed by "npm run start"
- "npm install" will install all npm dependencies.
- "npm run start" will bundle the front-end code and start the Express server listening on port 8080. Go to localhost:8080 once the bundle completes in your browser to access the app.
- "npm run build_dev" will run development build process of app.
- "npm run build_prod" will run production build process of app.

Notes:
- Requires Node v6.9.0 or later to run locally due to webpack-dev-middleware dependency.