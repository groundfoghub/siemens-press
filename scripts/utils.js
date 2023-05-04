/**
 * @param {Element} element
 */
export const removeClasses = (element) => {
  element.classList.forEach((className) => {
    element.classList.remove(className);
  });
};

/**
 * @param {Element} block
 * @param {Object} options
 * @param {Object} defaultOptions
 * @returns {Array} Map element class names to values of 'option' object.
 */
export const getOptionClasses = (block, options, defaultOptions) => {
  const classKeys = Object.keys(options);

  let keysInBlockOptions = [...block.classList].filter((key) => classKeys.includes(key));

  if (keysInBlockOptions.length === 0) {
    keysInBlockOptions = defaultOptions;
  }

  return keysInBlockOptions.map((key) => options[key]);
};

export const isHeading = (node) => /^h\d$/i.test(node.tagName);

/**
 *
 * @param {string} maybeDate
 * @returns {boolean}
 */
export const isStringDate = (maybeDate) => {
  const properDate = new Date(maybeDate);

  return typeof maybeDate !== 'undefined' && !Number.isNaN(properDate);
};
