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

/**
 * Finds nodes by text content.
 * @param {Element} element Container element
 * @param {RegExp} regExp Regular expression to filter text content by
 * @returns {Array<Node>}
 */
export const findNodesByRegExp = (element, regExp) => {
  const filter = {
    acceptNode(node) {
      // Checks for nodes that are text nodes and match the given regular expression.
      if (node.nodeType === document.TEXT_NODE && regExp.test(node.nodeValue)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_REJECT;
    },
  };
  const nodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, filter);
  while (walker.nextNode()) {
    // Returns the element containing the node
    nodes.push(walker.currentNode.parentNode);
  }
  return nodes;
};