import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from 'stores/store';
import { Auth } from 'actions';
import { CookiesProvider, Cookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { NotFound } from 'components';
import Home from 'modules/home';
import App from 'modules/app';
import Signup from 'modules/signup';
import Login from 'modules/login';
import ForgotPassword from 'modules/forgot-password';
import history from 'utils/history';
import 'utils/axios.config';
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

const cookies = new Cookies();
const token = cookies.get('JMT_AUTH_TOKEN');

if (token) store.dispatch(Auth.checkLogin(token));

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router history={history}>
        <div>
          <Switch>
            {isDevelopment ? (
              <Route path="/test" component={TestRoutes} />
            ) : null}
            <Route exact path="/" component={Home} />
            <Route path="/main" component={App} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route component={NotFound} />
          </Switch>
          <ToastContainer
            position={toast.POSITION.BOTTOM_CENTER}
            autoClose={3000}
          />
        </div>
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('app')
);
