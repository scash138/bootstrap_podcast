(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function(){
//show more or less function
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
  }

  function paginationFunc(data){
    var pages = Math.ceil(data.length/9);
        //pagination for ajax podcast guests
        $('#podcast-pagination-group').twbsPagination('destroy');//call destroy
        $('#podcast-pagination-group').twbsPagination({
            totalPages: pages,
            visiblePages: 4,
            hideOnlyOnePage: true,
            onPageClick: function (event, page) {

              var ubound = (page * 9);
              var lbound = ((page * 9) - 9);
              $.each($('#podcast .guest'),function() {
                if(data[lbound] == null) {
                  $('h3', this).text('');
                  $('h4', this).text('');
                  $('p', this).text('');
                  $('.photo img', this).removeClass('img-circle');
                  $('.photo img', this).removeAttr('src');
                  $('.photo img', this).removeAttr('alt');
                  $('.photo a', this).hide();
                  lbound +=1;
                } else {
                  $('h3', this).text(data[lbound].guest);
                  $('h4', this).text('Episode #' + data[lbound].episode + ' - ' + data[lbound].date);
                  $('p', this).text(data[lbound].description);
                  $('.photo img', this).addClass('img-circle');
                  $('.photo img', this).attr('src',data[lbound].image);
                  $('.photo img', this).attr('alt',data[lbound].alt);
                  $('.photo a', this).attr('href',data[lbound].audiofile);
                  $('.photo a', this).show();
                  lbound +=1;
                }

              });

              showMore(); //run show more to limit characters in description
              hideRows();
              $('#podcast-pagination-group a').click(function() {
                var topoffset = 50;
                $('html,body').animate({
                  scrollTop: $('#podcast').offset().top+topoffset+2
                }, 500);
              });
            }
        });
  }

  function hideRows(){
    $('.row-2').show();
    $('.row-3').show();
    if ($('.row-2 .info h3').first().text() == '') {
      $('.row-2').hide();
    }
    if ($('.row-3 .info h3').first().text() == '') {
      $('.row-3').hide();
    }
  }

  //search function Winthrop
  $('.searchpodcast').click(function(){
    var searchTerm = $('#srch-term').val();
    var searchExp = new RegExp(searchTerm, "i");
    var i = 0;

    $.each($('#podcast .guest'),function() {
      $('h3', this).text('');
      $('h4', this).text('');
      $('p', this).text('');
      $('.photo img', this).removeClass('img-circle');
      $('.photo img', this).removeAttr('src');
      $('.photo img', this).removeAttr('alt');
      $('.photo a', this).hide();
    });
//need to make this a filter insted of if then statement search grep array
    $.getJSON('js/podcasts.json', function(data) {
      var returnarry = $.grep(data.podcasts, function(e, i){
        return e.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0;
      });

      $.each(returnarry, function(index, val) {
            $("#podcast .guest h3").eq(i).text(val.guest);
            $('#podcast .guest h4').eq(i).text('Episode #' + val.episode + ' - ' + val.date);
            $('#podcast .guest p').eq(i).text(val.description);
            $('#podcast .guest .photo img').eq(i).addClass('img-circle');
            $('#podcast .guest .photo img').eq(i).attr('src',val.image);
            $('#podcast .guest .photo img').eq(i).attr('alt',val.alt);
            $('#podcast .guest .photo a').eq(i).attr('href',val.audiofile);
            $('#podcast .guest .photo a').eq(i).show();
            i +=1;
      });
      showMore();
      paginationFunc(returnarry);
    });
    return false;
  });


  //get json
  $.getJSON('js/podcasts.json', function(data) {
    // try {
    $.each(data.podcasts, function(index, val) {
          $("#podcast .guest h3").eq(index).text(val.guest);
          $('#podcast .guest h4').eq(index).text('Episode #' + val.episode + ' - ' + val.date);
          $('#podcast .guest p').eq(index).text(val.description);
          $('#podcast .guest .photo img').eq(index).addClass('img-circle');
          $('#podcast .guest .photo img').eq(index).attr('src',val.image);
          $('#podcast .guest .photo img').eq(index).attr('alt',val.alt);
          $('#podcast .guest .photo a').eq(index).attr('href',val.audiofile);
          $('#podcast .guest .photo a').eq(index).show();
    });
      showMore();
      paginationFunc(data.podcasts);
    // } catch(err){
    //
    // }
  })
  .done(function(data) {
    hideRows();
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

/*
 * jQuery Bootstrap Pagination v1.4.1
 * https://github.com/esimakin/twbs-pagination
 *
 * Copyright 2014-2016, Eugene Simakin <john-24@list.ru>
 * Released under Apache-2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
!function(a,b,c,d){"use strict";var e=a.fn.twbsPagination,f=function(b,c){if(this.$element=a(b),this.options=a.extend({},a.fn.twbsPagination.defaults,c),this.options.startPage<1||this.options.startPage>this.options.totalPages)throw new Error("Start page option is incorrect");if(this.options.totalPages=parseInt(this.options.totalPages),isNaN(this.options.totalPages))throw new Error("Total pages option is not correct!");if(this.options.visiblePages=parseInt(this.options.visiblePages),isNaN(this.options.visiblePages))throw new Error("Visible pages option is not correct!");if(this.options.onPageClick instanceof Function&&this.$element.first().on("page",this.options.onPageClick),this.options.hideOnlyOnePage&&1==this.options.totalPages)return this.$element.trigger("page",1),this;this.options.totalPages<this.options.visiblePages&&(this.options.visiblePages=this.options.totalPages),this.options.href&&(this.options.startPage=this.getPageFromQueryString(),this.options.startPage||(this.options.startPage=1));var d="function"==typeof this.$element.prop?this.$element.prop("tagName"):this.$element.attr("tagName");return"UL"===d?this.$listContainer=this.$element:this.$listContainer=a("<ul></ul>"),this.$listContainer.addClass(this.options.paginationClass),"UL"!==d&&this.$element.append(this.$listContainer),this.options.initiateStartPageClick?this.show(this.options.startPage):(this.currentPage=this.options.startPage,this.render(this.getPages(this.options.startPage)),this.setupEvents()),this};f.prototype={constructor:f,destroy:function(){return this.$element.empty(),this.$element.removeData("twbs-pagination"),this.$element.off("page"),this},show:function(a){if(a<1||a>this.options.totalPages)throw new Error("Page is incorrect.");return this.currentPage=a,this.render(this.getPages(a)),this.setupEvents(),this.$element.trigger("page",a),this},enable:function(){this.show(this.currentPage)},disable:function(){var b=this;this.$listContainer.off("click").on("click","li",function(a){a.preventDefault()}),this.$listContainer.children().each(function(){var c=a(this);c.hasClass(b.options.activeClass)||a(this).addClass(b.options.disabledClass)})},buildListItems:function(a){var b=[];if(this.options.first&&b.push(this.buildItem("first",1)),this.options.prev){var c=a.currentPage>1?a.currentPage-1:this.options.loop?this.options.totalPages:1;b.push(this.buildItem("prev",c))}for(var d=0;d<a.numeric.length;d++)b.push(this.buildItem("page",a.numeric[d]));if(this.options.next){var e=a.currentPage<this.options.totalPages?a.currentPage+1:this.options.loop?1:this.options.totalPages;b.push(this.buildItem("next",e))}return this.options.last&&b.push(this.buildItem("last",this.options.totalPages)),b},buildItem:function(b,c){var d=a("<li></li>"),e=a("<a></a>"),f=this.options[b]?this.makeText(this.options[b],c):c;return d.addClass(this.options[b+"Class"]),d.data("page",c),d.data("page-type",b),d.append(e.attr("href",this.makeHref(c)).addClass(this.options.anchorClass).html(f)),d},getPages:function(a){var b=[],c=Math.floor(this.options.visiblePages/2),d=a-c+1-this.options.visiblePages%2,e=a+c;d<=0&&(d=1,e=this.options.visiblePages),e>this.options.totalPages&&(d=this.options.totalPages-this.options.visiblePages+1,e=this.options.totalPages);for(var f=d;f<=e;)b.push(f),f++;return{currentPage:a,numeric:b}},render:function(b){var c=this;this.$listContainer.children().remove();var d=this.buildListItems(b);a.each(d,function(a,b){c.$listContainer.append(b)}),this.$listContainer.children().each(function(){var d=a(this),e=d.data("page-type");switch(e){case"page":d.data("page")===b.currentPage&&d.addClass(c.options.activeClass);break;case"first":d.toggleClass(c.options.disabledClass,1===b.currentPage);break;case"last":d.toggleClass(c.options.disabledClass,b.currentPage===c.options.totalPages);break;case"prev":d.toggleClass(c.options.disabledClass,!c.options.loop&&1===b.currentPage);break;case"next":d.toggleClass(c.options.disabledClass,!c.options.loop&&b.currentPage===c.options.totalPages)}})},setupEvents:function(){var b=this;this.$listContainer.off("click").on("click","li",function(c){var d=a(this);return!d.hasClass(b.options.disabledClass)&&!d.hasClass(b.options.activeClass)&&(!b.options.href&&c.preventDefault(),void b.show(parseInt(d.data("page"))))})},makeHref:function(a){return this.options.href?this.generateQueryString(a):"#"},makeText:function(a,b){return a.replace(this.options.pageVariable,b).replace(this.options.totalPagesVariable,this.options.totalPages)},getPageFromQueryString:function(a){var b=this.getSearchString(a),c=new RegExp(this.options.pageVariable+"(=([^&#]*)|&|#|$)"),d=c.exec(b);return d&&d[2]?(d=decodeURIComponent(d[2]),d=parseInt(d),isNaN(d)?null:d):null},generateQueryString:function(a,b){var c=this.getSearchString(b),d=new RegExp(this.options.pageVariable+"=*[^&#]*");return c?"?"+c.replace(d,this.options.pageVariable+"="+a):""},getSearchString:function(a){var c=a||b.location.search;return""===c?null:(0===c.indexOf("?")&&(c=c.substr(1)),c)},getCurrentPage:function(){return this.currentPage}},a.fn.twbsPagination=function(b){var c,e=Array.prototype.slice.call(arguments,1),g=a(this),h=g.data("twbs-pagination"),i="object"==typeof b?b:{};return h||g.data("twbs-pagination",h=new f(this,i)),"string"==typeof b&&(c=h[b].apply(h,e)),c===d?g:c},a.fn.twbsPagination.defaults={totalPages:1,startPage:1,visiblePages:5,initiateStartPageClick:!0,hideOnlyOnePage:!1,href:!1,pageVariable:"{{page}}",totalPagesVariable:"{{total_pages}}",page:null,first:"First",prev:"Previous",next:"Next",last:"Last",loop:!1,onPageClick:null,paginationClass:"pagination",nextClass:"page-item next",prevClass:"page-item prev",lastClass:"page-item last",firstClass:"page-item first",pageClass:"page-item",activeClass:"active",disabledClass:"disabled",anchorClass:"page-link"},a.fn.twbsPagination.Constructor=f,a.fn.twbsPagination.noConflict=function(){return a.fn.twbsPagination=e,this},a.fn.twbsPagination.version="1.4.1"}(window.jQuery,window,document);
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

},{}]},{},[1])