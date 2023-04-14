export default function decorate(block) {
  block.classList.add('newHomeContentBannerElement');
  block.children[0].classList.add('newHomeContentBannerElement__headline');

  block.children[1].classList.add('newHomeContentBannerElement__text');

  const dateContainer = block.children[2];
  dateContainer.classList.add('newHomeContentBannerElement__dateContainer');

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

  dateContainer.append(saveDateButton);
}
