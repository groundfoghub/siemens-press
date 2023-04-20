import { getOptionClasses, removeClasses } from '../../scripts/utils.js';

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
  const listWrapper = block.children[0];
  listWrapper.classList.add('newHomeCards__list');

  [...listWrapper.children].forEach((cardWrapper, index) => {
    // card wrapper
    cardWrapper.classList.add('newHomeCardWrapper', `newHomeCardNumber${index}`);

    // card inside card wrapper
    const card = document.createElement('div');
    card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

    // if image add it to card
    const cardItems = cardWrapper.children;
    const picture = cardItems[0].querySelector('picture');
    if (picture) {
      const media = document.createElement('div');
      media.classList.add('newHomeCard__media');
      media.append(picture);
      card.append(media);
      cardItems[0].remove();
    }

    // add outer div for content
    const cardContent = document.createElement('div');
    cardContent.classList.add('newHomeCard__content');
    card.append(cardContent);

    // add card heading to content
    const heading = cardItems[0];
    heading.classList.add('newHomeCard__heading');
    cardContent.append(heading);

    // add description to content
    const description = document.createElement('div');
    description.classList.add('newHomeCard__description');
    cardContent.append(description);

    // add cardItems to description
    [...cardItems].forEach((item) => {
      description.append(item);

      if (item.tagName === 'UL' || item.tagName === 'OL') {
        item.classList.add('newtonLinklist', 'newHomeLinkList');
      }

      // style list elements
      item.querySelectorAll('ul, ol').forEach((list) => {
        list.classList.add('newtonLinklist', 'newHomeLinkList');
      });

      // style link elements
      item.querySelectorAll('a').forEach((link) => {
        removeClasses(link);
        link.classList.add(
          'newHomeLink--listDecorator',
          'newHomeLink',
          'newHomeLink--decorated',
          'newHomeLink--iconLeft',
          'newHomeLink--internal',
        );

        if (link.querySelector('svg')) {
          link.classList.add('removePseudoElement');
        }
      });
    });

    // append card to card wrapper
    cardWrapper.append(card);
  });
}
