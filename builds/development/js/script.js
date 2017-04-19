(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
  $.getJSON('js/podcasts.json', function(data) {
    //show more and less results function
    function showMore(){
      var showChar = 150;  // How many characters are shown by default
      var ellipsestext = "...";
      var moretext = "Show more >>";
      var lesstext = "<< Show less";


      $('.guest-description').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);

          var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

          $(this).html(html);
        }
      });

      $(".morelink").click(function(){
        if($(this).hasClass("less")) {
          $(this).removeClass("less");
          $(this).html(moretext);
        } else {
          $(this).addClass("less");
          $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
      });
    }//end of show more less function

    //get ajax json podcast guests
    var podcastData = $.each(data.podcasts, function(index, el) {
    });
    var pages = Math.ceil(podcastData.length/9);
    if(pages > 1) {
      for (var i = 0; i < pages; i++) {
        $('.page-count').append('<button type="button" class="btn-group btn-default" value="' + (i+1) + '">' + (i+1) + '</button>');
      }
    }//end get ajax json podcast guests

    //populate elements with podcast guests
    $.each($('#podcast .guest'),function(index, el) {
      $('h3', this).text(podcastData[index].guest);
      $('h4', this).text('Episode #' + podcastData[index].episode + ' - ' + podcastData[index].date);
      $('p', this).text(podcastData[index].description);
      $('.photo img', this).addClass('img-circle');
      $('.photo img', this).attr('src',podcastData[index].image);
      $('.photo img', this).attr('alt',podcastData[index].alt);
      $('.photo a', this).attr('href',podcastData[index].audiofile);
    });

    showMore(); //run show more to limit characters in description

    //onclick to replace elements with new guests
    $('.next-page button').click(function(){
      var ubound = ($(this).val() * 9);
      var lbound = (($(this).val() * 9) - 9);

      $.each($('#podcast .guest'),function() {
        if(podcastData[lbound] == null) {
          $('h3', this).text('');
          $('h4', this).text('');
          $('p', this).text('');
          $('.photo img', this).removeClass('img-circle');
          $('.photo img', this).removeAttr('src');
          $('.photo img', this).removeAttr('alt');
          $('.photo a', this).hide();
          lbound +=1;
        } else {
          $('h3', this).text(podcastData[lbound].guest);
          $('h4', this).text('Episode #' + podcastData[lbound].episode + ' - ' + podcastData[lbound].date);
          $('p', this).text(podcastData[lbound].description);
          $('.photo img', this).addClass('img-circle');
          $('.photo img', this).attr('src',podcastData[lbound].image);
          $('.photo img', this).attr('alt',podcastData[lbound].alt);
          $('.photo a', this).attr('href',podcastData[lbound].audiofile);
          $('.photo a', this).show();
          lbound +=1;
        }

      });

      showMore(); //run show more to limit characters in description
    });

    //search function
    $('.searchpodcast').click(function(){
      var searchTerm = $('#srch-term').val();
      console.log(searchTerm);
      console.log(podcastData);
      // $.each(podcastData.description, function(){
      //
      // })
      // console.log($('#srch-term').val());
      return false;
    })

})
  .done(function(data) {
      // var showChar = 100;  // How many characters are shown by default
      // var ellipsestext = "...";
      // var moretext = "Show more >>";
      // var lesstext = "<< Show less";
      //
      //
      // $('.guest-description').each(function() {
      //   var content = $(this).html();
      //
      //   if(content.length > showChar) {
      //
      //       var c = content.substr(0, showChar);
      //       var h = content.substr(showChar, content.length - showChar);
      //
      //       var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
      //
      //       $(this).html(html);
      //   }
      // });
      //
      // $(".morelink").click(function(){
      //   if($(this).hasClass("less")) {
      //       $(this).removeClass("less");
      //       $(this).html(moretext);
      //   } else {
      //       $(this).addClass("less");
      //       $(this).html(lesstext);
      //   }
      //   $(this).parent().prev().toggle();
      //   $(this).prev().toggle();
      //   return false;
      // });
  })
  .fail(function() {

  })
  .always(function() {

  });
});

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

$(function(){
  'use strict';

  $('#main-carousel .item img').each(function() {
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
  
  $(window).on('activate.bs.scrollspy', function (e) {
  history.replaceState({}, "", $("a[href^='#']", e.target).attr("href"));
});
});

},{}]},{},[1])