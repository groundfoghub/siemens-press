export default function decorate(block) {
  block.classList.add(
    'newHomeContentBannerElement',
    'newHomeComponent',
    'newHomeScrollSection',
  );

  const componentWrapper = document.createElement('div');
  componentWrapper.classList.add('newHomeContentBannerElement__componentWrapper');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('newHomeContentBannerElement__contentWrapper');

  // Picture can be located wherever in the block
  const picture = block.querySelector('PICTURE');

  if (picture) {
    const imgWrapper = block.children[0];
    imgWrapper.classList.add('newHomeContentBannerElement__imgWrapper');
    contentWrapper.classList.add('newHomeContentBannerElement__contentWrapper--hasImg');
    imgWrapper.firstElementChild.classList.add(
      'responsiveImage--hasAspectRatio',
      'responsiveImage--supportsAspectRatio',
      'responsiveImage',
      'lazyloaded',
    );
    imgWrapper.firstElementChild.append(picture);
    componentWrapper.append(imgWrapper);
  }

  const [topContainer, headline, text] = block.children;

  if (topContainer) {
    topContainer.classList.add('newHomeContentBannerElement__topContainer');
    topContainer.firstElementChild?.classList.add('newHomeContentBannerElement__topLine');
    contentWrapper.append(topContainer);
  }

  if (headline) {
    headline.classList.add('newHomeContentBannerElement__headline');
    contentWrapper.append(headline);
  }

  if (text) {
    text.classList.add('newHomeContentBannerElement__text');
    contentWrapper.append(text);
  }

  componentWrapper.append(contentWrapper);

  block.prepend(componentWrapper);
}
