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
