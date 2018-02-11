import React from 'react';
import PropTypes from 'prop-types';
import { ListIcon, CategoryIcon } from '../../ListIcon';

const ListItem = props => {
  // blog-category-list-item--active
  const { icon, children } = props;
  return (
    <li className="blog-category-list-item">
      <ListIcon icon={icon} />
      <span className="blog-category-list-item-text">
        {children}
      </span>
    </li>
  );
};

const SidebarLeft = props => {
  return (
    <div className="blog-category-sidebar">
      <div className="blog-category-topic-wrapper">
        <CategoryIcon />
      </div>
      <ul className="blog-category-list">
        <ListItem icon="js">Javascript</ListItem>
        <ListItem icon="react">React</ListItem>
        <ListItem icon="node">Node</ListItem>
        <ListItem icon="mongodb">MongoDB</ListItem>
        <ListItem icon="css">CSS</ListItem>
        <ListItem icon="html">HTML</ListItem>
      </ul>
    </div>
  );
};

SidebarLeft.propTypes = {
  children: PropTypes.node,
};

SidebarLeft.defaultProps = {};

export default SidebarLeft;