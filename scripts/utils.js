export const removeClasses = (element) => {
  element.classList.forEach((className) => {
    element.classList.remove(className);
  });
};

export const getOptionClasses = (block, options, defaultOptions) => {
  const classKeys = Object.keys(options);

  let keysInBlockOptions = [...block.classList].filter((key) => classKeys.includes(key));

  if (keysInBlockOptions.length === 0) {
    keysInBlockOptions = defaultOptions;
  }

  return keysInBlockOptions.map((key) => options[key]);
};
