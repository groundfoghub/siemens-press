export default function decorate(block) {
  // Create div element with class and data attributes
  const div1 = document.createElement('div');
  div1.className = 'newHomeBurgerMenu newHomeBurgerMenu__showNav newHomeBurgerMenu__NavInUse';
  div1.setAttribute('data-ste-element', 'Burger Menu');

  // Create inner elements
  const div2 = document.createElement('div');
  div2.className = 'newHomeBurgerMenu__background newHomeBurgerMenu__openNav';

  const nav = document.createElement('nav');
  nav.className = 'newHomeBurgerMenu__navigationWrapper newHomeBurgerMenu__secondNavLevel';

  const div3 = document.createElement('div');
  div3.className = 'newHomeBurgerMenu__navigationHeader';

  const div4 = document.createElement('div');
  div4.className = 'newHomeBurgerMenu__closeElement';

  const button = document.createElement('button');
  button.id = 'close';
  button.setAttribute('aria-label', 'Menu close');
  button.className = 'newHomeBurgerMenu__navigationClose';
  button.setAttribute('data-ste-element', 'Menu close');

  div4.appendChild(button);
  div3.appendChild(div4);
  nav.appendChild(div3);

  const div5 = document.createElement('div');
  div5.className = 'newHomeBurgerMenu__navigationBody';
  div5.setAttribute('data-ste-element', 'navigation-flyout');

  const div6 = document.createElement('div');
  div6.className = 'newHomeBurgerMenu__navigationLeft';

  const div7 = document.createElement('div');
  div7.className = 'newHomeBurgerMenu__firstLevel';

  const div8 = document.createElement('div');
  div8.className = 'newHomeBurgerMenu__showOverviewWrapper';

  const a1 = document.createElement('a');
  a1.id = 'Products & Services';
  a1.className = 'newHomeBurgerMenu__showOverview newHomeBurgerMenu__showOverviewAppear';
  a1.href = 'https://new.siemens.com/global/en/products.html';
  a1.setAttribute('data-ste-element', 'Products & Services');
  a1.textContent = 'Products & Services';

  div8.appendChild(a1);
  div7.appendChild(div8);

  const ul1 = document.createElement('ul');

  const li1 = document.createElement('li');
  li1.className = 'newHomeBurgerMenu__firstLinkdisappear';

  const button2 = document.createElement('button');
  button2.id = '0';
  button2.className = 'newHomeBurgerMenu__naviItem newHomeBurgerMenu__naviItem--noLink';
  button2.setAttribute('aria-haspopup', 'true');
  button2.setAttribute('aria-expanded', 'false');
  button2.setAttribute('data-ste-element', 'Products & Services');
  button2.textContent = 'Products & Services';

  li1.appendChild(button2);
  ul1.appendChild(li1);

  div7.appendChild(ul1);
  div6.appendChild(div7);
  div5.appendChild(div6);

  const div9 = document.createElement('div');
  div9.className = 'newHomeBurgerMenu__navigationRight newHomeBurgerMenu__navigatedForward';

  const div10 = document.createElement('div');
  div10.className = 'newHomeBurgerMenu__prevLevel';

  const div11 = document.createElement('div');
  div11.className = 'fluidScroller fluidScroller--revealAnimation newHomeBurgerMenu__navigationScroller';
  div11.setAttribute('data-ste-element', 'Scroller');

  const ul2 = document.createElement('ul');
  ul2.className = 'ps scrollerOverlayLeftTopHidden scrollerOverlayRightBottomHidden';

  const div12 = document.createElement('div');
  div12.className = 'ps__rail-x';

  block.appendChild(div1);
}
