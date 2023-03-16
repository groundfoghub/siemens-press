/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile, setViewport } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: '../../scripts/dummy.html' });

const { buildBlock, decorateBlock, loadBlock } = await import('../../../scripts/lib-franklin.js');

document.body.innerHTML = await readFile({ path: '../../scripts/body.html' });

const sleep = async (time = 1000) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, time);
});
const navMeta = document.createElement('meta');
navMeta.setAttribute('name', 'nav');
navMeta.setAttribute('content', 'https://main--helix-project-boilerplate--adobe.hlx.page/test/blocks/header/nav');
document.head.append(navMeta);

const headerBlock = buildBlock('header', [[]]);
document.querySelector('header').append(headerBlock);
decorateBlock(headerBlock);
await loadBlock(headerBlock);
await sleep();

describe('Header block', () => {
  it('Hamburger shows and hides nav', async () => {
    const hamburger = document.querySelector('.header nav.newHomeHeader__navigation');
    const nav = document.querySelector('.header nav.newHomeHeader__links');
    expect(hamburger).to.exist;
    expect(nav).to.exist;
  });
});
