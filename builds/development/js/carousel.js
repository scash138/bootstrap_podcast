$(function(){
  'use strict';

  var slideQuantity = $('#home .item').length;
  var wHeight = '500px';

  $('.fullheight').css('height', wHeight);
  //carousel indicators //
  for (var i = 0; i < slideQuantity; i++) {
    var insertText = '<li data-target="#main-carousel" data-slide-to="' + i + '"></li>';
    $('#home ol').append(insertText);
  }

  $('.carousel').carousel({
    interval: 5000
  });
});
