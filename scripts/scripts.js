import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

import { decorateButtonsFW, decorateMedia, decorateAsFluidwebPage } from './lib-fluidweb.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  const paragraph = main.querySelector('h1 + p, h1 + ul, h1 + ol');
  const button = main.querySelector('a');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) && Node.DOCUMENT_POSITION_PRECEDING)) {
    let elems = [picture, h1];

    if (paragraph) {
      elems = [
        ...elems,
        paragraph,
      ];
    }

    if (button && paragraph
      && (
        (button.compareDocumentPosition(paragraph) && Node.DOCUMENT_POSITION_PRECEDING)
        || (button.compareDocumentPosition(h1) && Node.DOCUMENT_POSITION_PRECEDING)
      )
    ) {
      elems = [
        ...elems,
        button,
      ];
    }
    const section = document.createElement('div');
    section.append(buildBlock('stage', { elems }));
    main.prepend(section);
  }
}

/**
 * Builds headline block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeadlineBlock(main) {
  const h2s = main.querySelectorAll('h2');

  h2s.forEach((h2) => {
    // Check for optional h3 tag, right after h2
    const h3 = h2.parentElement.querySelector('h2 + h3');

    const placeholder = document.createElement('div');

    // Add placeholder right after h2, as we are about to modify the h2
    h2.parentNode.insertBefore(placeholder, h2.nextSibling);
    const headlineBlock = buildBlock('headline', { elems: [h2, h3] });
    placeholder.replaceWith(headlineBlock);
    placeholder.remove();
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
    buildHeadlineBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateMedia(main);
  // hopefully forward compatible button decoration
  decorateButtonsFW(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateAsFluidwebPage(document.body);

  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
