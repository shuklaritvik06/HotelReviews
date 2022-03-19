const { initializeApp } = require('firebase/app');
const config = require('../config');
const firebaseApp = initializeApp(config.firebaseConfig);
module.exports = firebaseApp;