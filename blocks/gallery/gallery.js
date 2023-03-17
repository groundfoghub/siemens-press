import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js';

export default function decorate(block) {
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

  const prev = document.createElement('button');
  prev.classList.add('swiper-button-prev', 'swiper-button');
  const next = document.createElement('button');
  next.classList.add('swiper-button-next', 'swiper-button');
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
  block.append(carousel);

  const noSwipingSelector = '.fluidVideo';

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
