import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const makeContainer = (element: HTMLElement | null): HTMLElement => {
  if (!element) {
    throw new Error('Can not get element by id "root"');
  }
  return element;
};

ReactDOMClient.createRoot(makeContainer(container)).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
