export default function decorate(block) {
  block.classList.add('newHomeHeadline');

  block.querySelector('h2').classList.add('newHomeHeadline__main');

  const h3 = block.querySelector('h3');

  if (h3) {
    h3.classList.add('newHomeHeadline__sub');
  }
}
