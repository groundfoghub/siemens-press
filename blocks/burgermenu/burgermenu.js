const closeInnerLevel = (block) => {
  const wrapper = block.querySelector('.newHomeBurgerMenu__navigationWrapper');

  wrapper.classList.remove('newHomeBurgerMenu__secondNavLevel');
  wrapper.classList.add('newHomeBurgerMenu__firstNavLevel');

  block.querySelector('.newHomeBurgerMenu__currentPosition').remove();
  block.querySelector('.newHomeBurgerMenu__showOverviewWrapper').remove();
  block.querySelector('.newHomeBurgerMenu__navigationRight').remove();
};

const openInnerLevel = (block, element) => {
  const wrapper = block.querySelector('.newHomeBurgerMenu__navigationWrapper');

  wrapper.classList.remove('newHomeBurgerMenu__firstNavLevel');
  wrapper.classList.add('newHomeBurgerMenu__secondNavLevel');

  // Create the back button
  const backButton = document.createElement('button');
  backButton.classList.add('newHomeBurgerMenu__currentPosition');
  backButton.setAttribute('aria-label', 'Burger Menu back button');
  backButton.setAttribute('data-ste-element', 'Main menu');
  backButton.addEventListener('click', () => closeInnerLevel(block));

  // Create the arrow icon for the back button
  const arrowIcon = document.createElement('span');
  arrowIcon.classList.add('newHomeBurgerMenu__goBack', 'newHomeBurgerMenu__arrowBack');

  // Create the current title span
  const currentTitle = document.createElement('span');
  currentTitle.classList.add('newHomeBurgerMenu__currentTitle');
  currentTitle.setAttribute('tabindex', '-1');
  currentTitle.textContent = 'Main menu';

  // Append the arrow icon and current title to the back button
  backButton.appendChild(arrowIcon);
  backButton.appendChild(currentTitle);

  // Create the show overview wrapper div
  const showOverviewWrapper = document.createElement('div');
  showOverviewWrapper.classList.add('newHomeBurgerMenu__showOverviewWrapper');

  // Create the show overview link
  const showOverviewLink = element.querySelector('a');
  showOverviewLink.classList.add('newHomeBurgerMenu__showOverview', 'newHomeBurgerMenu__showOverviewAppear');

  showOverviewWrapper.appendChild(showOverviewLink);

  // Create the inner navigation list
  const firstLevel = block.querySelector('.newHomeBurgerMenu__firstLevel');
  firstLevel.append(backButton, showOverviewWrapper);

  const navigationBody = block.querySelector('.newHomeBurgerMenu__navigationBody');

  const navigationRight = document.createElement('div');
  navigationRight.classList.add('newHomeBurgerMenu__navigationRight', 'newHomeBurgerMenu__navigatedForward');
  const other = document.createElement('div');
  other.classList.add('newHomeBurgerMenu__otherLevel');

  const innerNavigation = element.querySelector('ul');

  [...innerNavigation.children].forEach((li) => {
    li.classList.add('newHomeBurgerMenu__item');
    [...li.children][0]?.classList.add('newHomeBurgerMenu__naviItem');
  });

  other.append(innerNavigation);
  navigationRight.append(other);
  navigationBody.append(navigationRight);
};

const createNavigation = (navigationBlock, classNames, block) => {
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
    primaryNavItem.append(navLink);

    if (subNavigation) {
      navLink.classList.add('newHomeBurgerMenu__naviItem--noLink');
      navLink.addEventListener('click', () => openInnerLevel(block, element.cloneNode(true)));
    } else {
      navLink.href = navLinkData.href;
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
    const navigation = createNavigation(ul, classNames, block);

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
