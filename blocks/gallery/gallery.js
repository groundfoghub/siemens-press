/* eslint-disable import/no-unresolved */
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

const updateDescription = (
  description,
  descriptionDict,
  currentIndex,
  imageTitle,
  paginationCurrent,
) => {
  if (descriptionDict[currentIndex]) {
    // set the description to the one stored in the descriptionDict
    imageTitle.innerHTML = descriptionDict[currentIndex];
  } else {
    // if there is no description
    imageTitle.innerHTML = '';
  }
  paginationCurrent.innerHTML = currentIndex + 1;
};

const createDescription = (descriptionDict, block, currentIndex, totalSlides) => {
  const description = document.createElement('div');
  description.classList.add('newHomeGallery__description');

  const pagination = document.createElement('div');
  pagination.classList.add('newHomeGallery__pagination');

  const paginationCurrent = document.createElement('span');
  paginationCurrent.classList.add('newHomeGallery__paginationCurrent');
  paginationCurrent.innerHTML = currentIndex + 1;

  const paginationTotal = document.createElement('span');
  paginationTotal.classList.add('newHomeGallery__paginationTotal');
  paginationTotal.innerHTML = `/ ${totalSlides}`;

  pagination.append(paginationCurrent);
  pagination.append(paginationTotal);

  const descriptionText = document.createElement('div');
  descriptionText.classList.add('newHomeGallery__descriptionText');

  const imageTitle = document.createElement('div');
  imageTitle.classList.add('newHomeGallery__imageTitle');

  // if the first slide has a description add it as imageTitle
  imageTitle.innerHTML = descriptionDict[currentIndex] ? descriptionDict[currentIndex] : '';

  descriptionText.append(imageTitle);

  description.append(pagination);

  description.append(descriptionText);

  // remove nodes not needed anymore after adding description to imageTitle
  [...block.children].forEach((child) => child.children[1]?.remove());

  return [description, imageTitle, paginationCurrent];
};

export default function decorate(block) {
  let currentIndex = 0;
  const descriptionDict = {};
  let description;
  let hasDescription = false;
  let imageTitle;
  let paginationCurrent;
  const totalSlides = [...block.children].length;

  block.classList.add(
    'newHomeSection',
    'newHomeSection__layoutDefault',
    'newHomeGallery',
    'newHomeComponent',
    'fluidNavigator__item',
    'newHomeScrollSection',
  );

  const carousel = document.createElement('div');
  carousel.classList.add(
    'newHomeCarousel',
    'newHomeCarousel--previewAdjacent',
    'newHomeCarousel--disablePreviewShadow',
    'newHomeCarousel--swipingNotStarted',
    'animation--isDone',
    'animatedOnce--animated',
  );
  const navigation = document.createElement('div');
  navigation.classList.add('newHomeCarousel__navigation');

  [...block.children].forEach((child, index) => {
    // check if any slide has a description and store the text in descriptionDict
    // if there is a description text add it to the descriptionDict

    if (child.children[1].innerHTML.length > 0) {
      hasDescription = true;
      descriptionDict[index] = child.children[1].innerHTML;
    }
  });

  if (hasDescription) {
    [description, imageTitle, paginationCurrent] = createDescription(
      descriptionDict,
      block,
      currentIndex,
      totalSlides,
    );
  }

  const prev = document.createElement('button');
  prev.classList.add('swiper-button-prev', 'swiper-button');
  prev.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateDescription(description, descriptionDict, currentIndex, imageTitle, paginationCurrent);
  });

  const next = document.createElement('button');
  next.classList.add('swiper-button-next', 'swiper-button');
  next.addEventListener('click', () => {
    currentIndex += 1;
    updateDescription(description, descriptionDict, currentIndex, imageTitle, paginationCurrent);
  });

  const swiper = document.createElement('div');
  swiper.classList.add('swiper');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const images = block.querySelectorAll('img');
  images.forEach((element) => {
    element.classList.add('newHomeGallery__responsiveImage');
  });
  const pictures = block.querySelectorAll('picture');
  pictures.forEach((element) => {
    const slide = document.createElement('div');
    slide.classList.add(
      'swiper-slide',
      'newHomeGallery__slide',
      'newHomeCarouselMedia',
      'newHomeCarouselMedia__landscape',
      'newHomeCarouselMedia__imageSlide',
      'newHomeCarouselMedia--limitHeight',
      'swiper-slide-active',
    );
    const galleryImageWrapper = document.createElement('div');
    galleryImageWrapper.classList.add(
      'newHomeGallery__responsiveImageWrapper',
      'responsiveImage--hasAspectRatio',
      'responsiveImage--supportsAspectRatio',
      'responsiveImage',
    );

    galleryImageWrapper.append(element);
    slide.append(galleryImageWrapper);
    swiperWrapper.append(slide);
  });
  navigation.append(prev);
  navigation.append(next);
  swiper.append(swiperWrapper);
  navigation.append(swiper);
  carousel.append(navigation);
  // append description if at least one description exists
  if (description) {
    carousel.append(description);
  }
  block.append(carousel);

  const noSwipingSelector = '.fluidVideo';

  /* once the swipping has started the prev and next slide are shown
  style opacity: 1 */

  const removeClassFromCarousel = () => {
    carousel.classList.remove('newHomeCarousel--swipingNotStarted');
    next?.removeEventListener('click', removeClassFromCarousel);
  };

  next?.addEventListener('click', removeClassFromCarousel);

  /* eslint-disable no-new */
  new Swiper('.swiper', {
    centeredSlides: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    loop: false,
    navigation: {
      enabled: true,
      nextEl: next,
      prevEl: prev,
    },
    noSwipingSelector,
    slidesPerView: 'auto',
    speed: 1500,
  });
}
