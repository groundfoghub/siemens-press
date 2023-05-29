import {
  buildBlock, decorateBlock, decorateIcons, getMetadata, loadBlock,
} from '../../scripts/lib-franklin.js';
import { closeInnerLevel, openInnerLevel } from '../burgermenu/burgermenu.js';

const isBurgerMenuOpen = () => {
  const burgerButton = document.querySelector('.newHomeHeader__burgerMenu');

  return JSON.parse(burgerButton.getAttribute('aria-expanded'));
};

const closeMenu = () => {
  const burgerButton = document.querySelector('.newHomeHeader__burgerMenu');
  closeInnerLevel();
  document.body.classList.remove('modal');
  burgerButton.setAttribute('aria-expanded', false);
};

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    window.removeEventListener('keydown', closeOnEscape);
    if (isBurgerMenuOpen()) {
      closeMenu();
    }
  }
}

const closeOnResize = () => {
  window.removeEventListener('resize', closeOnResize);
  if (isBurgerMenuOpen()) {
    closeMenu();
  }
};

const toggleBurgerMenu = async (block, navigationHtml, element, rootLevel) => {
  const burgerButton = block.querySelector('.newHomeHeader__burgerMenu');
  const isClosed = !isBurgerMenuOpen();

  if (isClosed) {
    const exstistingBurgerMenu = block.querySelector('.newHomeBurgerMenu');

    if (exstistingBurgerMenu === null) {
      const navTemp = document.createElement('div');
      navTemp.innerHTML = navigationHtml;
      const burgerMenu = buildBlock('burgermenu', { elems: [navTemp] });
      block.append(burgerMenu);
      decorateBlock(burgerMenu); // Will enable lazy loading of block code
      await loadBlock(burgerMenu);
      block
        .querySelector('.newHomeBurgerMenu__navigationClose')
        .addEventListener('click', () => toggleBurgerMenu(block));
    }

    if (typeof rootLevel !== 'undefined') {
      const burgerMenuBlock = document.querySelector('.burgermenu');

      closeInnerLevel();
      openInnerLevel(
        burgerMenuBlock,
        element,
      );
    }

    burgerButton.setAttribute('aria-expanded', true);
    document.body.classList.add('modal');
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnResize);
  } else {
    closeMenu();
  }
};

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const navigationHtml = await resp.text();

    const navTemp = document.createElement('div');
    navTemp.innerHTML = navigationHtml;

    const primaryNav = navTemp.querySelector('ul');

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.classList.add('newHomeHeader__navigation');
    nav.id = 'navigation';

    [...primaryNav.children].forEach((element, index) => {
      const navLink = element.querySelector('a');
      const navButton = document.createElement('button');
      navButton.classList.add('newHomeHeader__firstNaviItem');
      navButton.innerHTML = navLink.innerHTML;
      navButton.addEventListener('click', () => toggleBurgerMenu(block, navigationHtml, element.cloneNode(true), index));

      navLink.parentElement.append(navButton);
      navLink.remove();
    });

    nav.append(primaryNav);

    const secondaryNav = navTemp.querySelector('ul');

    [...secondaryNav.children].forEach((element) => {
      element.querySelector('a').classList.add('newHomeHeader__link', 'newHomeLink', 'newHomeHeader__link');
    });

    const links = document.createElement('nav');
    links.classList.add('newHomeHeader__links');
    links.append(secondaryNav);

    const navWrapper = document.createElement('div');
    navWrapper.classList.add('nav-wrapper', 'newHomeHeader__topBar');

    // Build Logo
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('newHomeHeader__logoContainer');

    const logo = document.createElement('a');
    logo.classList.add('newHomeHeader__logo', 'newHomeLink', 'newHomeHeader__logo');
    logo.href = '/';

    const logoSiemens = document.createElement('div');
    logoSiemens.classList.add('newHomeHeader__logoSiemens');

    logo.append(logoSiemens);
    logoContainer.append(logo);
    navWrapper.append(logoContainer);

    const burgerMenuWrapper = document.createElement('div');
    burgerMenuWrapper.classList.add('newHomeHeader__burgerMenuWrapper');
    const burgerMenu = document.createElement('button');
    burgerMenu.classList.add('newHomeHeader__burgerMenu');
    burgerMenu.setAttribute('aria-expanded', false);
    burgerMenu.addEventListener('click', () => toggleBurgerMenu(block, navigationHtml));
    burgerMenuWrapper.append(burgerMenu);
    navWrapper.append(burgerMenuWrapper);

    const burgerMenuCloseWrapper = document.createElement('div');
    burgerMenuCloseWrapper.classList.add('newHomeHeader__navigationCloseWrapper');
    const burgerMenuClose = document.createElement('button');
    burgerMenuClose.classList.add('newHomeHeader__navigationClose');
    burgerMenuClose.addEventListener('click', () => toggleBurgerMenu(block, navigationHtml));
    burgerMenuCloseWrapper.append(burgerMenuClose);
    navWrapper.append(burgerMenuCloseWrapper);

    navWrapper.append(nav);
    navWrapper.append(links);

    decorateIcons(nav);

    block.append(navWrapper);
  }

  // const header = document.querySelector('header');
  block.classList.add('newHomeHeader');
}
