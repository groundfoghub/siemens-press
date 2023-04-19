import { getOptionClasses, removeClasses } from '../../scripts/fluidweb.js';

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

export default function decorate(block) {
  block.classList.add(
    'newHomeCards',
    'newHomeComponent',
    getOptionClasses(block, options, [1]),
  );

  const list = document.createElement('div');
  list.classList.add('newHomeCards__list');

  [...block.children].forEach((element, index) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('newHomeCardWrapper', `newHomeCardNumber${index}`);

    const card = document.createElement('div');
    card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

    const picture = element.querySelector('picture');
    if (picture) {
      const media = document.createElement('div');
      media.classList.add('newHomeCard__media');
      media.append(picture);
      card.append(media);
    }
    element.firstElementChild.remove();

    const contentWithTags = document.createElement('div');
    contentWithTags.classList.add('newHomeCard__contentWithTags');

    const description = document.createElement('div');
    description.classList.add('newHomeCard__description');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('newHomeCard__buttonContainer');

    const contentToAdd = [...element.firstElementChild.children];
    contentToAdd.forEach((node, idx) => {
      const headingOptions = node.tagName === 'H1' || node.tagName === 'H2' || node.tagName === 'H3';
      const headingWithClass = node.classList.contains('headline');

      const isEventLocationDate = idx === 0 && !headingOptions && !headingWithClass;
      const isHeading = headingOptions || headingWithClass;
      const isDescription = node.tagName === 'P';
      const isLink = node.classList.contains('button-container');

      if (isEventLocationDate) {
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

        element.append(event);
        node.remove();
      }
      else if (isHeading) {
        const headingElement = headingOptions ? node : node.querySelector('h2');
        headingElement.classList.add('newHomeCard__heading');
        contentWithTags.append(headingElement);
      }
      else if (isLink) {
        const link = node.querySelector('a');
        if (link) {
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
        }
        buttonContainer.append(link);
        node.remove();
      } 
      else if (isDescription) {
        description.append(node);
      }
    });

    element.firstElementChild.remove();
    element.classList.add('newHomeCard__content');
    element.append(contentWithTags);
    element.append(description);
    element.append(buttonContainer);

    card.append(element);
    cardWrapper.append(card);
    list.append(cardWrapper);
  });

  block.append(list);
}
