import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.js';
import './style.css'; // comment out when testing Mentors page
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC191XIxB2zWa6AJP1DE6l4cG8n3JWSVgY",
  authDomain: "info-340-h2h.firebaseapp.com",
  databaseURL: "https://info-340-h2h-default-rtdb.firebaseio.com",
  projectId: "info-340-h2h",
  storageBucket: "info-340-h2h.appspot.com",
  messagingSenderId: "564575147326",
  appId: "1:564575147326:web:fea89c44f20d0924e8086f"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
