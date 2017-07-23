$(function(){
  'use strict';

  $('#main-carousel .item img').each(function() {
    var imgSource = $(this).attr('src');
    $(this).parent().css({'background-image':'url(' + imgSource + ')'});
    $(this).remove();
  });
});
