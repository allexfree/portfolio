'use strict';

$('.portfolio__slider').slick({
  mobileFirst: true,
  variableWidth: true,
  arrows: false,
  dots: true,
  dotsClass: 'portfolio__pagination',
  responsive: [
    {
      breakpoint: 319,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    }
  ]
});
