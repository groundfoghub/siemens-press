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

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */
export function decorateButtonsFW(element) {
  element.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent && !a.querySelector('img')) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;

      if (up.childNodes.length === 1) {
        if (up.tagName === 'P' || up.tagName === 'DIV') {
          a.className = 'button primary newHomeButton newHomeButton--primary'; // default
          up.classList.add('button-container');
          // tertiary button
          if (a.firstElementChild?.className.includes('icon')) {
            a.className = 'button tertiary newHomeButton newHomeButton--terciery';
            up.classList.add('button-container');
          } else if (up.previousElementSibling?.tagName === 'H1') {
            // hero button inside stage with H1 (header only)
            a.className = 'button newHomeButton newHomeButton--hero';
            up.classList.add('button-container');
          }
        } else if (up.tagName === 'STRONG'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button primary newHomeButton newHomeButton--primary';
          twoup.classList.add('button-container');
        } else if (up.tagName === 'EM'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button secondary newHomeButton newHomeButton--secondary';
          twoup.classList.add('button-container');
        }
      } else if (up.childNodes.length > 1) {
        // hero button inside stage with H1 (header + description)
        if ((up.tagName === 'P' || up.tagName === 'DIV') && up.previousElementSibling?.tagName === 'H1') {
          a.className = 'button newHomeButton newHomeButton--hero';
          up.classList.add('button-container');
        }
      }
    }
  });
}
