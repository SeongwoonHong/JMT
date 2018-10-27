import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from 'stores/store';

import NotFound from 'components/NotFound';
import Main from 'modules/Main/Main';
import './styles';

const isDevelopment = process.env.NODE_ENV === 'development';

let TestRoutes;
if (isDevelopment) {
  TestRoutes = require('./test/routes').default;
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          {
            isDevelopment
              ? <Route path="/test" component={ TestRoutes } />
              : null
          }
          <Route exact path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

