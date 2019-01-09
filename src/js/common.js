'use strict';

$(document).ready(function () {

  var widthBody = document.body.clientWidth,
      block = $('.about__content-main');

  function isVisible(tag) {
    var t = $(tag);
    var w = $(window);
    var wt = w.scrollTop();
    var tt = t.offset().top;
    var tb = tt + t.height();
    return ((tb <= wt + w.height()) && (tt >= wt));
  }

  $(window).scroll(function() {
    if (widthBody >= 970 && isVisible(block)) {
      $('.about__content-line').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).attr('data-final-value')
        },
          {
            duration: 3000,
            easing: 'linear',
            step: function (now) {
              $(this).text(Math.ceil(now) + '%');
            }
          });
      });
    }
  });

  $('.menu-burger').click(function () {
    $('#menu-mobile').toggleClass('page-header__menu--active');
    $('.menu-burger').toggleClass('menu-burger--active');
  });

  $('.page-header__menu-link').click(function (evt) {
    evt.preventDefault();
    $('#menu-mobile').toggleClass('page-header__menu--active');
    $('.menu-burger').toggleClass('menu-burger--active');
    $('html, body').stop().animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });

  $('.page-header__menu--desktop > .page-header__menu-list a').click(function (evt) {
    evt.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });

  $('.portfolio__slider').slick({
    mobileFirst: true,
    variableWidth: true,
    dots: true,
    dotsClass: 'portfolio__pagination',
    arrows: true,
    responsive: [
      {
        breakpoint: 319,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 749,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          appendArrows: '.portfolio__slider',
          prevArrow: '<button class="portfolio__arrows-previous" type="button" aria-label="Previous slide"></button>',
          nextArrow: '<button class="portfolio__arrows-next" type="button" aria-label="Next slide"></button>'
        }
      }
    ]
  });

  $('.contacts__form').submit(function () {
    $.ajax({
      type: 'POST',
      url: '../mail.php',
      data: $('.contacts__form').serialize()
    }).done(function () {
      alert('You message is sent. Thank you');
      setTimeout(function () {
        $('.callback').trigger('reset');
      }, 1000);
      window.location = '../thanks.html'
    });
    return false;
  });

})
