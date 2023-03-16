import { getSectionMetadata, removeClasses } from '../../scripts/fluidweb.js';

const classByCardsNumber = [
  'oneColumn',
  'twoColumns',
  'threeColumns',
  'fourColumns',
];

const getCardsNumber = (block, defaultNumber = 1) => {
  const cardsNumber = getSectionMetadata('cardsnumber', block);

  try {
    return classByCardsNumber[cardsNumber - 1];
  } catch {
    return defaultNumber;
  }
};

export default function decorate(block) {
  block.classList.add(
    'newHomeCards',
    'newHomeComponent',
    `newHomeCards--${getCardsNumber(block)}`,
  );

  const list = document.createElement('div');
  list.classList.add('newHomeCards__list');

  [...block.children].forEach((element, index) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('newHomeCardWrapper', `newHomeCardNumber${index}`);

    const card = document.createElement('div');
    card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

    const media = document.createElement('div');
    media.classList.add('newHomeCard__media');

    const picture = element.querySelector('picture');
    if (picture) {
      media.append(picture);
    }

    element.classList.add('newHomeCard__content');

    const contentParts = element.querySelectorAll('p');

    const contentWithTags = document.createElement('div');
    contentWithTags.classList.add('newHomeCard__contentWithTags');
    const heading = document.createElement('h2');
    heading.classList.add('newHomeCard__heading');

    heading.append(contentParts[0]);
    contentWithTags.append(heading);
    element.append(contentWithTags);

    const description = document.createElement('div');
    description.classList.add('newHomeCard__description');
    description.append(contentParts[1]);
    element.append(description);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('newHomeCard__buttonContainer');

    const link = contentParts[2].querySelector('a');
    removeClasses(link);
    link.classList.add(
      'newHomeCard__button',
      'newHomeButton',
      'newHomeButton--terciery',
      'newHomeButton--link',
      'newHomeCard__button',
      'newHomeLink',
      'newHomeLink--decorated',
      'newHomeLink--internal',
      'newHomeLink--iconRight',
      'newHomeCard__button',
      'newHomeButton',
      'newHomeButton--terciery',
      'newHomeButton--link',
      'newHomeCard__button',
    );
    buttonContainer.append(contentParts[2]);
    element.append(buttonContainer);

    card.append(media);
    card.append(element);
    cardWrapper.append(card);
    list.append(cardWrapper);
  });

  block.append(list);
}
