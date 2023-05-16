export default function decorate(block) {
  // Create div element with class and data attributes
  const div1 = document.createElement('div');
  div1.className = 'newHomeBurgerMenu newHomeBurgerMenu__showNav newHomeBurgerMenu__NavInUse';
  div1.setAttribute('data-testid', 'burger-menu-component');

  // Create inner elements
  const div2 = document.createElement('div');
  div2.className = 'newHomeBurgerMenu__background newHomeBurgerMenu__openNav';

  const nav = document.createElement('nav');
  nav.className = 'newHomeBurgerMenu__navigationWrapper newHomeBurgerMenu__firstNavLevel';

  const div3 = document.createElement('div');
  div3.className = 'newHomeBurgerMenu__navigationBody';
  div3.setAttribute('data-testid', 'burger-menu-component-navigation-body');

  const div4 = document.createElement('div');
  div4.className = 'newHomeBurgerMenu__navigationLeft';
  div4.setAttribute('data-testid', 'burger-menu-component-navigation-left');

  const div5 = document.createElement('div');
  div5.className = 'newHomeBurgerMenu__firstLevel';
  div5.setAttribute('data-testid', 'burger-menu-component-first-level');

  const primaryNav = block.querySelector('ul');
  [...primaryNav.children].forEach((element) => {
    element.className = 'newHomeBurgerMenu__firstLinkappear firstItem';

    const navItem = element.querySelector('a');
    navItem.classList.add('newHomeBurgerMenu__naviItem');
  });

  div5.appendChild(primaryNav);

  const links = document.createElement('div');
  links.className = 'newHomeBurgerMenu__links';

  const secondaryNav = block.querySelector('ul');
  secondaryNav.classList.add('newHomeBurgerMenu__links');

  [...secondaryNav.children].forEach((element) => {
    const navItem = element.querySelector('a');
    navItem.classList.add('newHomeBurgerMenu__link', 'newHomeLink', 'newHomeBurgerMenu__link');
  });

  div5.appendChild(secondaryNav);

  // document.body.querySelectorAll();

  // Append elements to construct the HTML block
  div4.appendChild(div5);
  div3.appendChild(div4);
  nav.appendChild(div3);
  div2.appendChild(nav);
  div1.appendChild(div2);

  // Append the final div element to the document body or any desired parent element
  block.appendChild(div1);
}
