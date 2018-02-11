import React from 'react';
import PropTypes from 'prop-types';
import Subscribe from '../../Subscribe';

const SidebarRight = props => {
  return (
    <div className="blog-sidebar blog-sidebar-right">
      <Subscribe />
    </div>
  );
};

SidebarRight.propTypes = {
  children: PropTypes.node,
};

SidebarRight.defaultProps = {};

export default SidebarRight;