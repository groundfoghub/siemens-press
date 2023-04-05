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

  [...block.children].forEach((element, index) => {

    element.classList.add('newHomeCards__list');

    [...element.children].forEach(item => item.classList.add('newHomeCardWrapper'))

    const cardWrappers = element.querySelectorAll('.newHomeCardWrapper')

    cardWrappers.forEach(cardWrapper => {
      // card wrapper
      cardWrapper.classList.add(`newHomeCardNumber${index}`);

      // card inside card wrapper
      const card = document.createElement('div');
      card.classList.add('newHomeCard', 'newHomeCard--oneColumn', 'newHomeComponent', 'newHomeScrollSection');

      // all content
      const contentParts = cardWrapper.querySelectorAll('p');

      const contentWithoutPicture = [...contentParts].filter(content => content.firstElementChild?.tagName !== 'PICTURE')

      // add outer div for content
      const cardContent = document.createElement('div');
      cardContent.classList.add('newHomeCard__content')

      // add card heading to content
      const heading = document.createElement('h2')
      heading.classList.add('newHomeCard__heading')
      heading.append(contentWithoutPicture[0])
      cardContent.append(heading)

      // add media to card if exists
      contentParts.forEach(content => {
        if (content.firstElementChild?.tagName === 'PICTURE') {
          content.classList.add('newHomeCard__media')
          card.append(content)
        }
      })
      
      // add description to content
      const description = document.createElement('div');
      description.classList.add('newHomeCard__description', 'newtonLinklist', 'newHomeLinkList');
      const arrayContentParts = [...contentWithoutPicture]

      // add links to description
      arrayContentParts.slice(1).forEach(link => {
        const hasSVG = link.querySelector('svg')
        const aTag = link.querySelector('a');
        removeClasses(aTag);

        if (hasSVG) {
          aTag.classList.add('removePseudoElement')
        }

        aTag.classList.add(
          'newHomeLink--listDecorator',
          'newHomeLink',
          'newHomeLink--decorated',
          'newHomeLink--iconLeft', 
          'newHomeLink--internal'
        );
        link.append(aTag)
        description.append(link);
        cardContent.append(description);
      })

      // append content to card
      card.append(cardContent)

      // append card to card wrapper
      cardWrapper.append(card)
    })
  });
}
