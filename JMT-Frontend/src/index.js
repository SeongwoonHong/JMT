import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from 'stores/store';
import { CookiesProvider } from 'react-cookie';
import NotFound from 'components/NotFound';
import Landing from 'modules/Landing';
import Main from 'modules/Main';
import Signup from 'modules/Signup';
import Login from 'modules/Login';
import EmailVerified from 'modules/EmailVerified';
import './styles';

const isDevelopment = process.env.NODE_ENV === 'development';

let TestRoutes;
if (isDevelopment) {
  TestRoutes = require('./test/routes').default;
}

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <div>
          <Switch>
            {
              isDevelopment
                ? <Route path="/test" component={ TestRoutes } />
                : null
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/email-verified" component={EmailVerified} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
  document.getElementById('app'),
);

