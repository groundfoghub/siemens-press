import { getSectionMetadata } from '../../scripts/fluidweb.js';

const options = Object.freeze({
  left: 'option--mediaPositionLeft',
  right: 'option--mediaPositionRight',
});

const getMediaPositionClass = (block, defaultMediaPosition = 'right') => {
  const mediaPositionClass = options[getSectionMetadata('mediaposition', block)];

  return mediaPositionClass || options[defaultMediaPosition];
};

export default function decorate(block) {
  const picture = block.querySelector('picture');
  const hasMedia = picture !== null;

  block.classList.add(
    'newHomeSection',
    'newHomeSection__layoutDefault',
    'newHomeMediaRichText',
    'newHomeComponent',
    'fluidNavigator__item',
    'newHomeScrollSection',
  );

  // Text content
  const option = document.createElement('div');
  option.classList.add(
    getMediaPositionClass(block),
    hasMedia ? undefined : 'newHomeMediaRichText--textOnly',
  );
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('newHomeMediaRichText__textWrapper');
  const body = document.createElement('div');
  body.classList.add('newHomeMediaRichText__body');
  body.append(block.children[0]);
  textWrapper.append(body);
  option.append(textWrapper);
  block.append(option);

  // Media content
  if (hasMedia) {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('newHomeMediaRichText__imageWrapper');
    const galleryWrapper = document.createElement('div');
    galleryWrapper.classList.add('newHomeMediaRichText__galleryWrapper');
    const carousel = document.createElement('div');
    carousel.classList.add(
      'newHomeCarousel',
      'newHomeCarousel--swipingNotStarted',
      'newHomeCarousel--singleMedia',
      'animation--isDone',
      'animatedOnce--animated',
    );
    const navigation = document.createElement('div');
    navigation.classList.add('newHomeCarousel__navigation');

    navigation.append(picture);
    carousel.append(navigation);
    galleryWrapper.append(carousel);
    imageWrapper.append(galleryWrapper);
    option.append(imageWrapper);
  }
}
