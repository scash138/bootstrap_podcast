$(function(){
  'use strict';

  $('#home .item img').each(function() {
    var imgSource = $(this).attr('src');
    $(this).parent().css({'background-image':'url(' + imgSource + ')'});
    $(this).remove();
  });
});
