(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - topoffset + 2
          }, 500);
          return false;
        }
      }
    });
  });

  $('.carousel').carousel({
    interval: false
  });


});

},{}]},{},[1])