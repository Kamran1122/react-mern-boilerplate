export const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  if (type === 'unstyled') {
    return 'p';
  }
};

export default blockStyleFn;
