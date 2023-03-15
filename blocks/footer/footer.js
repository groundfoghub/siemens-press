import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const footerTemplate = `
    <div class="newHomeFooter__contactUs">
      <a class="newHomeFooter__contactUs--withIcon newHomeButton newHomeButton--secondary newHomeButton--link newHomeFooter__contactUs--withIcon newHomeLink newHomeFooter__contactUs--withIcon newHomeButton newHomeButton--secondary newHomeButton--link newHomeFooter__contactUs--withIcon" aria-label="" href="https://new.siemens.com/global/en/general/contact.html">
        <span>Contact us</span>
      </a>
    </div>
    <ul class="newHomeFooter__socialMedia"></ul>
    <ul class="newHomeFooter__footerLinksWrapper"></ul>
    <div class="newHomeFooter__copyrightWrapper"></div>`;

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);

  block.classList.add('newHomeFooter', 'newHomeScrollSection');
  block.setAttribute('id', 'newHomeFooter');
  block.innerHTML = footerTemplate;
  const footerLinksWrapper = block.querySelector('.newHomeFooter__footerLinksWrapper');
  const copyrightWrapper = block.querySelector('.newHomeFooter__copyrightWrapper');

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();
    const authorContent = document.createElement('div');
    authorContent.innerHTML = html;
    const linksParagraph = authorContent.querySelector('p');

    [...linksParagraph.children].forEach((element) => {
      element.classList.add('newHomeFooter__footerLink', 'newHomeLink', 'newHomeFooter__footerLink');

      const listItem = document.createElement('li');
      listItem.classList.add('newHomeFooter__footerLinksItem');
      listItem.append(element);
      footerLinksWrapper.append(listItem);

      linksParagraph.remove();

      return listItem;
    });

    const closingParagraph = authorContent.querySelector('p');

    [...closingParagraph.children].forEach((element) => {
      if (element.tagName === 'A') {
        element.classList.add('newHomeFooter__copyrightLink', 'newHomeLink', 'newHomeFooter__copyrightLink');
        copyrightWrapper.append(element);
      }
    });

    const copyright = document.createElement('span');
    copyright.classList.add('newHomeFooter__copyright');

    // At this point 'closingParagragh' has no children, it has only inner text
    copyright.append(closingParagraph.textContent);

    copyrightWrapper.append(copyright);

    decorateIcons(block);
  }
}
