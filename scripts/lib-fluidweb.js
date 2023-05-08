import { buildBlock, decorateBlock } from './lib-franklin.js';
import { findNodesByRegExp } from './utils.js';

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

export const imagePathTemplate = ({
  uuid, width, quality = 'high', extension = 'webp',
}) => `https://assets.new.siemens.com/siemens/assets/api/uuid:${uuid}/width:${width}/quality:${quality}/${uuid}.${extension}`;

export const renditionsWidths = [
  3840,
  2732,
  2224,
  2048,
  1920,
  1266,
  1125,
  750,
  640,
  320,
  100,
];

export const createAssetVideo = (videoReference) => {
  // Embed block expects a link, so video reference is passed in href
  const videoBlock = document.createElement('a');
  videoBlock.href = videoReference;
  return buildBlock('embed', { elems: [videoBlock] });
};

export const createAssetPicture = (uuid, alt = '', eager = false) => {
  const picture = document.createElement('picture');
  const source = document.createElement('source');
  const renditions = {
    webp: [],
    jpg: [],
  };

  for (let i = 0; i < renditionsWidths.length - 1; i += 1) {
    const width = renditionsWidths[i];
    renditions.jpg.push(`${imagePathTemplate({
      uuid,
      width,
      extension: 'jpg',
    })} ${width}w`);
    renditions.webp.push(`${imagePathTemplate({
      uuid,
      width,
    })} ${width}w`);
  }
  source.setAttribute('srcset', [
    ...renditions.webp,
    ...renditions.jpg,
  ].join(','));
  picture.appendChild(source);

  const img = document.createElement('img');
  img.setAttribute('loading', eager ? 'eager' : 'lazy');
  img.setAttribute('alt', alt);
  picture.appendChild(img);
  img.setAttribute('src', imagePathTemplate({
    uuid,
    width: renditionsWidths[renditionsWidths.length - 1],
    extension: 'jpg',
    quality: 'low',
  }));

  return picture;
};

/**
 * Decorates media from Siemens Assets.
 * @param {Element} element Container element
 */
export const decorateMedia = (element) => {
  const MEDIA_REGEX = /image|video:([a-z0-9-]*)/gi;
  findNodesByRegExp(element, MEDIA_REGEX).forEach((media) => {
    const mediaMarker = media.textContent.split(':');
    let videoBlock;

    switch (mediaMarker[0].toLowerCase()) {
      case 'image':
        media.replaceWith(createAssetPicture(mediaMarker[1]));
        break;
      case 'video':
        videoBlock = createAssetVideo(media.textContent);
        media.replaceWith(videoBlock);
        decorateBlock(videoBlock); // Will enable lazy loading of block code
        media.classList.add('fluidVideo');
        break;

      default:
        // eslint-disable-next-line
        console.log(`Unsupported media markup: ${media.textContent}`);
    }
  });
};

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */
export const decorateButtonsFW = (element) => {
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
      }
    }
  });
};
