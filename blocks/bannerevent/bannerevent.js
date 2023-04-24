export default function decorate(block) {
  block.classList.add('newHomeContentBannerElement', 'newHomeComponent', 'newHomeScrollSection');

  const componentWrapper = document.createElement('div');
  componentWrapper.classList.add('newHomeContentBannerElement__componentWrapper');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('newHomeContentBannerElement__contentWrapper');

  let topContainer;
  let headline;
  let text;

  const hasImg = block.children[0]?.firstElementChild?.firstElementChild?.tagName === 'PICTURE';

  if (hasImg) {
    let imgWrapper;
    [imgWrapper, topContainer, headline, text] = block.children;

    contentWrapper.classList.add('newHomeContentBannerElement__contentWrapper--hasImg');
    imgWrapper.classList.add('newHomeContentBannerElement__imgWrapper');
    imgWrapper.firstElementChild.classList.add(
      'responsiveImage--hasAspectRatio',
      'responsiveImage--supportsAspectRatio',
      'responsiveImage',
      'lazyloaded',
    );

    componentWrapper.append(imgWrapper);
  } else {
    [topContainer, headline, text] = block.children;
  }

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

  // Button is always created
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('newHomeContentBannerElement__btnsContainer', 'newHomeContentBannerElement__btnsContainer--single');

  const saveDateButton = document.createElement('a');
  saveDateButton.classList.add(
    'newHomeContentBannerElement__link',
    'newHomeButton',
    'newHomeButton--terciery',
    'newHomeButton--icon',
    'newHomeButton--iconDownload',
    'newHomeContentBannerElement__link',
  );

  // TODO create ICS file with content when downloading
  saveDateButton.href = 'file.doc';
  saveDateButton.setAttribute('download', '');

  const saveDateButtonText = document.createElement('span');
  saveDateButtonText.classList.add('newHomeContentBannerElement__link-text');
  saveDateButtonText.innerHTML = 'Save the date';

  saveDateButton.append(saveDateButtonText);
  btnContainer.append(saveDateButton);

  contentWrapper.append(btnContainer);
  componentWrapper.append(contentWrapper);

  block.prepend(componentWrapper);
}
