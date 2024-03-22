// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSO2w7zEmX5JLD0VthjCHIK9-PyELiYC4",
  authDomain: "web-cloud-ynov-3a511.firebaseapp.com",
  projectId: "web-cloud-ynov-3a511",
  storageBucket: "web-cloud-ynov-3a511.appspot.com",
  messagingSenderId: "303872651757",
  appId: "1:303872651757:web:a0315be7be7c2295dbb7e4",
  measurementId: "G-YY099N97MY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
