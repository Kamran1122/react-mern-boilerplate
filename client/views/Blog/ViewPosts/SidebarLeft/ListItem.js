import React from 'react';
import PropTypes from 'prop-types';
import { ListIcon } from '../../ListIcon';

const ListItem = props => {
  // blog-category-list-item--active
  const { icon, children, onClick } = props;
  return (
    <li
      className="blog-category-list-item"
      onClick={onClick}
    >
      <ListIcon icon={icon} />
      <span className="blog-category-list-item-text">
        {children}
      </span>
    </li>
  );
};

ListItem.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
};

ListItem.defaultProps = {};

export default ListItem;