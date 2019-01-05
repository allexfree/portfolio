'use strict';

$( document ).ready(function() {

  $( '.menu-burger' ).click(function() {
    $( '#menu-mobile' ).toggleClass( 'page-header__menu--active' );
    $( 'body' ).toggleClass( 'modal-open' );
  });

  $( '.page-header__menu-link' ).click(function(evt) {
    evt.preventDefault();
    $( '#menu-mobile' ).toggleClass( 'page-header__menu--active' );
    $( 'body' ).toggleClass( 'modal-open' );
    $( 'html, body' ).stop().animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  })

  $( '.portfolio__slider' ).slick({
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
})
