import { getOptionClasses, removeClasses } from '../../scripts/fluidweb.js';
import { decorateIcons } from '../../scripts/lib-franklin.js';

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

  [...block.children].forEach((element, index) => {

    element.classList.add('newHomeCards__list');

    for (let item of element.children) {
      item.classList.add('newHomeCardWrapper')
    }

    const cardWrappers = element.querySelectorAll('.newHomeCardWrapper')

    for (let cardWrapper of cardWrappers) {
      // card wrapper
      cardWrapper.classList.add(`newHomeCardNumber${index}`);

      // card inside card wrapper
      const card = document.createElement('div');
      card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

      // all content
      const contentParts = cardWrapper.querySelectorAll('p');

      const contentWithoutPicture = Array.from(contentParts).filter(content => content.firstElementChild?.tagName !== 'PICTURE')

      // add outer div for content
      const cardContent = document.createElement('div');
      cardContent.classList.add('newHomeCard__content')

      // add card heading to content
      const heading = document.createElement('h2')
      heading.classList.add('newHomeCard__heading')
      heading.append(contentWithoutPicture[0])
      cardContent.append(heading)

      // add media to card if exists
      for (let content of contentParts) {
        if (content.firstElementChild?.tagName === 'PICTURE') {
          content.classList.add('newHomeCard__media')
          card.append(content)
        }
      }
      
      // add description to content
      const description = document.createElement('div');
      description.classList.add('newHomeCard__description');
      const arrayContentParts = Array.from(contentWithoutPicture)

      // add links to description
      for (let link of arrayContentParts.slice(1)) {
        const aTag = link.querySelector('a');
        removeClasses(aTag);
        aTag.classList.add(
          'newHomeCard__button',
          'newHomeButton',
          'newHomeButton--terciery',
          'newHomeButton--link',
          'newHomeLink',
          'newHomeLink--decorated',
          'newHomeLink--internal',
          // 'newHomeLink--iconRight',
        );
        link.append(aTag)
        description.append(link);
        cardContent.append(description);
      }

      // append content to card
      card.append(cardContent)

      // append card to card wrapper
      cardWrapper.append(card)
      
      index++
    }
  });
  // decorateIcons(block);
}
