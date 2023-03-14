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

export default decorateAsFluidwebPage;
