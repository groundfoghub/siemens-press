const createNavigation = (navigationBlock, classNames) => {
  const navigation = document.createElement('ul');
  navigation.classList.add(...classNames.ul);
  [...navigationBlock.children].forEach((element) => {
    const navLinkData = element.querySelector('a');
    const navLink = document.createElement('a');
    const subNavigation = element.parentNode.querySelector('ul');

    const primaryNavItem = document.createElement('li');
    primaryNavItem.classList.add(...classNames.li);
    navLink.classList.add(...classNames.a);
    navLink.textContent = navLinkData.textContent;
    navLink.href = navLinkData.href;
    primaryNavItem.append(navLink);

    if (subNavigation) {
      navLink.classList.add('newHomeBurgerMenu__naviItem--noLink');
    }

    navigation.append(primaryNavItem);
  });

  return navigation;
};

export default function decorate(block) {
  // Hides initial block content
  // will be used as data source to render navigation states.
  block.querySelector('div').style.display = 'none';
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

  block.querySelectorAll('div > ul').forEach((ul, index) => {
    let classNames = {
      ul: [],
      li: ['newHomeBurgerMenu__firstLinkappear', 'firstItem'],
      a: ['newHomeBurgerMenu__naviItem'],
    };

    if (index !== 0) {
      classNames = {
        ul: ['newHomeBurgerMenu__links'],
        li: [],
        a: ['newHomeLink', 'newHomeBurgerMenu__link'],
      };
    }
    const navigation = createNavigation(ul, classNames);

    div5.appendChild(navigation);
  });

  // Append elements to construct the HTML block
  div4.appendChild(div5);
  div3.appendChild(div4);
  nav.appendChild(div3);
  div2.appendChild(nav);
  div1.appendChild(div2);

  // Append the final div element to the document body or any desired parent element
  block.appendChild(div1);
}
