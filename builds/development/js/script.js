(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
  'use strict';

  var slideQuantity = $('#home .item').length;
  var wHeight = $(window).height();

  $('.fullheight').css('height', wHeight);
  //carousel indicators //
  for (var i = 0; i < slideQuantity; i++) {
    var insertText = '<li data-target="#home" data-slide-to="' + i + '"></li>';
    $('#home ol').append(insertText);
  }

  $('.carousel').carousel({
    interval: false
  });
  //adjust hieght of .fullheight elements on window resize
  $(window).resize(function(event) {
    var wHeight = $(window).height();
    $('.fullheight').css('height', wHeight);
  });
});

$(function(){
  'use strict';

  $('#home .item img').each(function() {
    var imgSource = $(this).attr('src');
    $(this).parent().css({'background-image':'url(' + imgSource + ')'});
    $(this).remove();
  });
});

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
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling
});

},{}]},{},[1])