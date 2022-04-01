import ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

const checkContainer = (element: HTMLElement | null): HTMLElement => {
  if (!element) {
    throw new Error('Can not get element by id "root"');
  }
  return element;
};

ReactDOMClient.createRoot(checkContainer(container)).render(<App />);
