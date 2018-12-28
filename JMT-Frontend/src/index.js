import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from 'stores/store';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import { NotFound } from 'components';
import Landing from 'modules/landing';
import App from 'modules/app';
import Signup from 'modules/signup';
import Login from 'modules/login';
import EmailVerified from 'modules/email-verified';
import history from 'utils/history';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'url-search-params-polyfill';
import './styles';

const isDevelopment = process.env.NODE_ENV === 'development';

let TestRoutes;
if (isDevelopment) {
  TestRoutes = require('./test/routes').default;
}

// for Accessibility
Modal.setAppElement(document.getElementById('app'));

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router history={history}>
        <div>
          <Switch>
            {
              isDevelopment
                ? <Route path="/test" component={ TestRoutes } />
                : null
            }
            <Route exact path="/" component={Landing} />
            <Route path="/main" component={App} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/email-verified" component={EmailVerified} />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer />
        </div>
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('app'),
);

