import React from 'react';
import PropTypes from 'prop-types';

const SidebarRight = props => {
  return (
    <div className="blog-sidebar-right" />
  );
};

SidebarRight.propTypes = {
  children: PropTypes.node,
};

SidebarRight.defaultProps = {};

export default SidebarRight;