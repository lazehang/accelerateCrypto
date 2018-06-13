## What is this?

Coin Of The Day cryptocurrency market app built using ReactJS

# Using the app
1. Navigate to random store
2. Login using Facebook or Twitter
3. Load sample coin data by clicking "Load sample coin" button
4. Play around with the adding/editing/removing coins from Inventory & Order

# Setting up on localhost
1. `npm install`
2. Create new project at [Firebase.com](https://console.firebase.google.com/)
3. In the new Firebase app, click "Database" in sidebar
4. Select "Realtime Database"
5. Select "Rules" tab, paste in contents of `security-rules.json` file
6. Click "Project Overview" in sidebar and select "Add Firebase to your webapp"
7. From the pop-up snippet copy apiKey, authDomain, databaseURL values and replace these in the `base.js` file
8. Click "Authentication" in sidebar and select "Sign-in method" tab
9. Enable "Facebook" and "Twitter" and paste in your App ID & App secret (from [Facebook developer](https://developers.facebook.com/) & [Twitter developer](https://apps.twitter.com/))
10. `npm start`
11. [Optional] If you change any css, run `npm run watch` so that webpack recompiles the CSS

# Ejecting from "create-react-app" node package
1. Checkout to new branch `git checkout -b ejected`
2. `npm run eject`

# To run in production
1. `npm run build`
2. [TODO]