import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LastLocationProvider } from 'react-router-last-location';


function App() {
  return (
    <div className="App">
      <React.Suspense fallback={false}>
        {/* <HashRouter> */}
        {/* <LastLocationProvider> */}
        <Provider store={store}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Provider>
        {/* </LastLocationProvider> */}
        {/* </HashRouter> */}
      </React.Suspense>
    </div>
  );
}

export default App;
