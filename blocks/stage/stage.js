// import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  block.classList.add(
    'newHomeSection',
    'newHomeSection__layoutStage',
    'newHomeStage',
    'newHomeStage--backgroundImageVideo',
    'option--sizeFullscreen',
  );

  // Transform image
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('newHomeStage__imageWrapper');
  const responsiveImage = document.createElement('div');
  responsiveImage.classList.add('newHomeStage__responsiveImage', 'responsiveImage');

  const picture = block.querySelector('picture');
  responsiveImage.append(picture);
  responsiveImage.querySelector('img').classList.add('newHomeStage__imageElement');
  imageWrapper.append(responsiveImage);

  // Transform heading
  const content = document.createElement('div');
  content.classList.add('newHomeStage__content');
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('newHomeStage__headerContainer');
  const heading = block.querySelector('h1');
  heading.classList.add('newHomeStage__header');

  headerContainer.append(heading);
  content.append(headerContainer);

  // Transform remaining markup
  const description = document.createElement('div');
  description.classList.add('newHomeStage__description');
  const text = document.createElement('div');
  text.classList.add('newHomeStage__text');

  // Enhancing Primary button to Hero button
  const heroButton = block.querySelector('.newHomeButton--primary');

  if (heroButton) {
    heroButton.classList.replace('newHomeButton--primary', 'newHomeButton--hero');
    heroButton.parentElement.removeChild(heroButton);
  }

  [...block.children].forEach((element) => {
    text.append(element);
  });
  description.append(text);
  if (heroButton) {
    description.append(heroButton);
  }
  content.append(description);

  block.append(imageWrapper);
  block.append(content);
}
