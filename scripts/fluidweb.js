export const removeClasses = (element) => {
  element.classList.forEach((className) => {
    element.classList.remove(className);
  });
};

export const getSectionMetadata = (cardsnumber, element = document) => {
  const section = element.closest(`[data-${cardsnumber}]`);

  if (section) {
    return section.dataset[cardsnumber];
  }

  return undefined;
};


export const getOptionClasses = (block, options, defaultOptions) => {
  const classKeys = Object.keys(options);

  let keysInBlockOptions = [...block.classList].filter((key) => classKeys.includes(key));

  if (keysInBlockOptions.length === 0) {
    keysInBlockOptions = defaultOptions;
  }

  return keysInBlockOptions.map((key) => options[key]);
};

export const decorateAsFluidwebPage = (root) => {
  root.classList.add('fluidWebRoot');

  const id = document.createElement('div');
  id.setAttribute('id', 'app');

  const app = document.createElement('div');
  app.classList.add('app', 'app--componentBelowHeader');

  const page = document.createElement('div');
  page.classList.add('fluidPage');

  const main = root.querySelector('main');
  main.setAttribute('id', 'main');
  main.classList.add('fluidNavigator');

  page.append(
    root.querySelector('header'),
    main,
    root.querySelector('footer'),
  );
  app.append(page);
  id.append(app);

  root.append(id);
};
