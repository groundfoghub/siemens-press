export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // follow class naming pattern kebab style for franklin boilerplate components

      const headingIsPTag = col.children[0]?.tagName === 'P';

      if (headingIsPTag && !pic) {
        col.children[0].classList.add('columns-heading');
      } else if (col.firstElementChild?.classList.contains('headline')) {
        const headlineElement = col.querySelector('h1')
        || col.querySelector('h2')
        || col.querySelector('h3');

        headlineElement.classList.add('columns-heading');
      } else if (col.firstElementChild?.tagName === 'H1'
        || col.firstElementChild?.tagName === 'H2'
        || col.firstElementChild?.tagName === 'H3'
      ) {
        col.firstElementChild.classList.add('columns-heading');
      }
      const colChildren = [...col.children];
      colChildren.shift();

      colChildren.forEach((child) => child.classList.add('columns-description'));
    });
  });
}
