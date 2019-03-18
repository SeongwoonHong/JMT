import React from 'react';
import cx from 'classnames';

const MaterialIcon = ({ className, onClick, name }) => {
  return (
    <i
      className={cx('material-icons', className)}
      onClick={onClick}
    >
      {name}
    </i>
  );
};

export default MaterialIcon;
