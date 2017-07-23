$(function(){
  'use strict';

  var topoffset = 50;
  //Activate scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });
  //active on linking to section
  var hash = $(this).find('li.active a').attr('href');

  if(hash !== '#home'){
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }

  $('.navbar-fixed-top').on('activate.bs.scrollspy', function(){
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#home'){
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  })

  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        console.log(target);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  $(window).on('activate.bs.scrollspy', function (e) {
  history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
});
});
