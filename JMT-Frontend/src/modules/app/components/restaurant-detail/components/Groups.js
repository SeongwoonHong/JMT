import React from 'react';
import Group from './Group';

const Groups = ({ groups }) => {
  return groups.map((group) => {
    return <Group date={group.date} count={group.count} />;
  });
};

export default Groups;
