import React from 'react';

const Input = ({ input, meta, ...rest }) => {
  const { touched, error } = meta;
  return (
    <div>
      <input
        {...input}
        {...rest}
      />
      {touched && error ? <span>{error}</span> : null}
    </div>
  )
};

export default Input;
