import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

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
    const navWrapper = document.createElement('div');
    navWrapper.classList.add('nav-wrapper', 'newHomeHeader__topBar');

    // Build Logo
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('newHomeHeader__logoContainer');

    const logo = document.createElement('a');
    logo.classList.add('newHomeHeader__logo', 'newHomeLink', 'newHomeHeader__logo');

    const logoSiemens = document.createElement('div');
    logoSiemens.classList.add('newHomeHeader__logoSiemens');

    logo.append(logoSiemens);
    logoContainer.append(logo);
    navWrapper.append(logoContainer);

    // Build search
    const burgerMenuWrapper = document.createElement('div');
    burgerMenuWrapper.classList.add('newHomeHeader__burgerMenuWrapper');
    const burgerMenu = document.createElement('button');
    burgerMenu.classList.add('newHomeHeader__burgerMenu');

    burgerMenuWrapper.append(burgerMenu);
    navWrapper.append(burgerMenuWrapper);

    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.classList.add('newHomeHeader__navigation');
    nav.id = 'navigation';

    const navTemp = document.createElement('div');
    navTemp.innerHTML = html;

    const primaryNav = navTemp.querySelector('ul');

    [...primaryNav.children].forEach((element) => {
      element.querySelector('a').classList.add('newHomeHeader__firstNaviItem');
    });

    nav.append(primaryNav);

    const secondaryNav = navTemp.querySelector('ul');

    [...secondaryNav.children].forEach((element) => {
      element.querySelector('a').classList.add('newHomeHeader__link', 'newHomeLink', 'newHomeHeader__link');
    });

    const links = document.createElement('nav');
    links.classList.add('newHomeHeader__links');
    links.append(secondaryNav);

    navWrapper.append(nav);
    navWrapper.append(links);

    decorateIcons(nav);

    block.append(navWrapper);
  }

  // const header = document.querySelector('header');
  block.classList.add('newHomeHeader');
}
