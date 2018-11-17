import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from 'stores/store';
import { CookiesProvider } from 'react-cookie';
import NotFound from 'components/NotFound';
import Landing from 'modules/landing';
import App from 'modules/app';
import Signup from 'modules/signup';
import Login from 'modules/login';
import EmailVerified from 'modules/email-verified';
import history from 'utils/history';
import 'url-search-params-polyfill';
import './styles';

const isDevelopment = process.env.NODE_ENV === 'development';

let TestRoutes;
if (isDevelopment) {
  TestRoutes = require('./test/routes').default;
}

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
        </div>
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('app'),
);

