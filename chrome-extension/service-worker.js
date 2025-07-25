import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('User is signed in');
  } else {
    console.log('User is signed out');
  }
});