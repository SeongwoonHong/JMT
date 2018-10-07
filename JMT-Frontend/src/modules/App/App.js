import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { App as AppAction, Alert } from 'actions';
import axios from 'axios';

class App extends React.Component {
  getMsgFromServer = () => {
    const { dispatch } = this.props;

    return dispatch(AppAction.getMsgFromServer());
  }

  getMsg = () => {
    const { dispatch } = this.props;

    return dispatch(AppAction.getMsg('hello world'));
  }

  getAlert = () => {
    const { dispatch } = this.props;

    return dispatch(Alert.show({
      type: 'testing',
      msg: 'hello alert!',
    }));
  }

  getAllUsers = () => {
    axios.get('/api/user/getAll').then(({ data }) => {
      console.log('all users = ', data);
    });
  }

  render() {
    const { msg, alert } = this.props;

    return (
      <div>
        <button onClick={this.getMsg}>getHelloWorld</button>
        <div>{ msg }</div>
        <button onClick={this.getMsgFromServer}>getHelloWorldFromServer</button>
        <button onClick={this.getAlert}>get alert</button>
        <button onClick={this.getAllUsers}>get all users</button>
        {
          alert.isVisible &&
          <div>
            <div>Alert message = {alert.msg}</div>
            <div>Alert type = {alert.type}</div>
          </div>
        }
      </div>
    );
  }
}

App.defaultProps = {
  msg: null,
  alert: {},
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  msg: PropTypes.string,
  alert: PropTypes.object,
};

export default connect((state) => ({
  msg: state.App.msg,
  alert: state.Alert,
}))(App);
