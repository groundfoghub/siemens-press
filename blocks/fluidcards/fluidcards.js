import { getOptionClasses, isStringDate, removeClasses } from '../../scripts/utils.js';

const options = Object.freeze({
  1: 'newHomeCards--oneColumn',
  2: 'newHomeCards--twoColumns',
  3: 'newHomeCards--threeColumns',
  4: 'newHomeCards--fourColumns',
  one: 'newHomeCards--oneColumn',
  two: 'newHomeCards--twoColumns',
  three: 'newHomeCards--threeColumns',
  four: 'newHomeCards--fourColumns',
});

const createEvent = (node) => {
  const [locationText, dateText] = node.innerHTML.split(',');

  const event = document.createElement('div');
  event.classList.add('newHomeCard__event');

  if (locationText) {
    const location = document.createElement('div');
    location.classList.add('newHomeCard__location');
    location.innerHTML = locationText;
    event.append(location);
  }

  if (dateText) {
    const date = document.createElement('div');
    date.classList.add('newHomeCard__date');
    date.innerHTML = dateText;
    event.append(date);
  }

  return event;
};

export default function decorate(block) {
  block.classList.add(
    'newHomeCards',
    'newHomeComponent',
    getOptionClasses(block, options, [1]),
  );

  const list = document.createElement('div');
  list.classList.add('newHomeCards__list');

  [...block.children].forEach((element, index) => {
    let buttonContainer;
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('newHomeCardWrapper', `newHomeCardNumber${index}`);

    const card = document.createElement('div');
    card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

    // Picture
    const picture = element.querySelector('picture');
    if (picture) {
      const media = document.createElement('div');
      media.classList.add('newHomeCard__media');
      media.append(picture);
      card.append(media);
    }

    // Text content
    const content = document.createElement('div');
    content.classList.add('newHomeCard__content');

    const contentWithTags = document.createElement('div');
    contentWithTags.classList.add('newHomeCard__contentWithTags');

    // Heading
    const headingElement = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (headingElement) {
      headingElement.classList.add('newHomeCard__heading');
      contentWithTags.append(headingElement);
    }

    // Link
    const link = element.querySelector('.button-container a');
    if (link) {
      buttonContainer = document.createElement('div');
      buttonContainer.classList.add('newHomeCard__buttonContainer');
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
      buttonContainer.append(link);
    }

    const description = document.createElement('div');
    description.classList.add('newHomeCard__description');

    // Remaining paragraphs, can be
    const contentToAdd = [...element.querySelectorAll('p')];
    contentToAdd.forEach((node) => {
      const [, maybeDate] = node.textContent.split(',');

      if (isStringDate(maybeDate)) {
        // ... the card event time and location
        content.append(createEvent(node));
      } else {
        // ... or part of card description
        description.append(node);
      }
    });

    // Putting all together
    content.append(contentWithTags);
    content.append(description);
    if (buttonContainer) {
      content.append(buttonContainer);
    }

    card.append(content);
    cardWrapper.append(card);
    list.append(cardWrapper);
  });

  block.append(list);
}
