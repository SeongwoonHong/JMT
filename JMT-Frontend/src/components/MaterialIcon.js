import React, { Component } from 'react';
import cx from 'classnames';

class MaterialIcon extends Component {
  render() {
    return (
      <i className={cx('material-icons', this.props.className)}>
        {this.props.name}
      </i>
    );
  }
}

export default MaterialIcon;
