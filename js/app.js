import $ from "jquery"

(function () {
  $('#mobile-menu-toggle').on('click', function (e) {
    $('header nav').toggleClass('open');
  });

  $('header nav').on('click', 'a', function(e) {
    $('header nav').removeClass('open');
  });

  $('.icon-tabs__container nav').on('click', 'a', function(e) {
    e.preventDefault();

    const targetTabName = $(this).attr('aria-controls');
    const $targetTab = $('#' + targetTabName);

    const $container = $(this).closest('.icon-tabs__container');
    const prevTabName = $container.attr('data-active-tab');

    if (targetTabName === prevTabName) {
      return;
    }

    $(this).siblings().attr('aria-selected', 'false');
    $(this).attr('aria-selected', 'true');
    $container.attr('data-active-tab', targetTabName);

    $container.find('.previous').removeClass('previous');
    $container.find('.active').removeClass('active');
    $('#' + prevTabName).addClass('previous');
    $targetTab.addClass('active');
  });

  const $track = $('.slider__track');
  const $slides = $('.slider__slide');
  let currentSlide = 0;
  let autoplay = true;

  const gotoSlide = index => {
    $slides.removeClass('active');

    if ( index < 0 ) {
      currentSlide = $slides.length - 1;
    } else if( index >= $slides.length) {
      currentSlide = 0;
    }

    $track.css('transform', `translateX(-${currentSlide * 100}%)`);
    $slides.eq(currentSlide).addClass('active');
  }

  $('.slider__next').click(e => {
    autoplay = false;
    gotoSlide(++currentSlide);
  });

  $('.slider__previous').click(e => {
    autoplay = false;
    gotoSlide(--currentSlide);
  });

  const scheduleNext = () => {
    if ( autoplay ) {
      gotoSlide(++currentSlide);
      setTimeout( scheduleNext, 5000 );
    }
  };

  setTimeout( scheduleNext, 5000 );

})();
