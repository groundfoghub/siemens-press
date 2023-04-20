import { getHeadingOptions } from '../../scripts/utils.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      col.classList.add('columns-container');
      
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // follow class naming pattern kebab style for franklin boilerplate components

      const headingIsPTag = col.children[!pic ? 0 : 1]?.tagName === 'P';
      const firstElementInCol = !pic ? col.children[0] : col.children[1];

      if (headingIsPTag) {
        if (pic) {
          col.children[1].classList.add('columns-heading');
        } else {
          col.children[0].classList.add('columns-heading');
        }
      } else if (firstElementInCol?.classList.contains('headline')) {
        const headlineElement = col.querySelector('h1')
        || col.querySelector('h2')
        || col.querySelector('h3');

        headlineElement.classList.add('columns-heading');
      } else if (firstElementInCol && getHeadingOptions(firstElementInCol)) {
        firstElementInCol.classList.add('columns-heading');
      }
      const colChildren = [...col.children];

      // assuming that we always have the pattern
      // heading (h1 - h5) or p
      // text body (paragraph)

      // or with image
      // image
      // heading (h1 - h5) or p
      // text body (paragraph)

      // therefore if we want to get the description it will be the element(s)
      // after the first element (which is a heading)
      // or if there is an image it will be the second after
      // (so we can "remove" the heading element from the array and add the description class)

      colChildren.shift();

      if (pic) {
        colChildren.shift();
      }
      colChildren.forEach((child) => child.classList.add('columns-description'));
    });
  });
}
