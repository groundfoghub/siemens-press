// import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  block.classList.add(
    'newHomeSection',
    'newHomeSection__layoutStage',
    'newHomeStage',
    'newHomeStage--backgroundImageVideo',
    'option--sizeFullscreen',
  );

  const tempFragment = document.createDocumentFragment();

  // Transform image
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('newHomeStage__imageWrapper');
  const responsiveImage = document.createElement('div');
  responsiveImage.classList.add('newHomeStage__responsiveImage', 'responsiveImage');

  const picture = block.querySelector('picture');
  responsiveImage.append(picture);
  responsiveImage.querySelector('img').classList.add('newHomeStage__imageElement');
  imageWrapper.append(responsiveImage);
  tempFragment.append(imageWrapper);

  // Transform heading
  const content = document.createElement('div');
  content.classList.add('newHomeStage__content');
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('newHomeStage__headerContainer');
  const heading = block.querySelector('h1');
  heading.classList.add('newHomeStage__header');

  headerContainer.append(heading);
  content.append(headerContainer);
  tempFragment.append(content);

  // Transform paragraph
  const description = document.createElement('div');
  description.classList.add('newHomeStage__description');
  const text = document.createElement('div');
  text.classList.add('newHomeStage__text');

  [...block.children].forEach((element) => {
    text.append(element);
  });
  description.append(text);
  content.append(description);

  [...tempFragment.children].forEach((element) => {
    block.append(element);
  });
}
