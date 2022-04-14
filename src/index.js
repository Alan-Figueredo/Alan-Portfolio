import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Alan Figueredo Portfolio</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <meta name="description" content="Alan Figueredo Portfolio" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
