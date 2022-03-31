import { store } from 'app/store';
import ErrorBoundary from 'components/ErrorBoundary';
import LoadingSkeleton from 'components/LoadingSkeleton';
import AppContainer from 'layouts/AppContainer';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingSkeleton />}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<AppContainer />} />
            </Routes>
          </BrowserRouter>
        </Provider>
        <ToastContainer />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
