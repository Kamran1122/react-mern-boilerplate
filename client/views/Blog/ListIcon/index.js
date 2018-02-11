import React from 'react';
import PropTypes from 'prop-types';
import js from '../../../assets/images/js.png'
import html from '../../../assets/images/html.png'
import css from '../../../assets/images/css.png'
import node from '../../../assets/images/node.png'
import react from '../../../assets/images/react.png'

const IconImage = props => {
  const icons = {
    js,
    html,
    css,
    node,
    react,
  };

  return (
    <img className={props.className} src={icons[props.icon] || js} />
  );
};

IconImage.propTypes = {
  children: PropTypes.node,
};

IconImage.defaultProps = {};

const ListIcon = props => <IconImage className="blog-category-list-icon" {...props} />;
const CategoryIcon = props => <IconImage className="blog-category-topic-icon" {...props} />;

export {
  ListIcon,
  CategoryIcon,
}