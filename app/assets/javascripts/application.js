// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require moment
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).ready(function() {
  
  $('html').on('click','button.hamburger', function() {
    $('.nav-items').toggleClass('open')
    $('.hamburger').toggleClass('open')
  })
  
  $('html').on('click','.search__book--action', function() {
    var book = $(this).siblings('.search__book--detail')
    var bookinfo = book.children('.search__info')
    var title = bookinfo.children('a').children('.search__title').html()
    var author = bookinfo.children('.search__author').children('span').html()
    var image = book.children('a').children('img.search__image').attr('src')
    var link = bookinfo.children('a').attr('href')
    console.log(title)
    console.log(author)
    console.log(image)
    console.log(link)
    const context = $(this)

    $.ajax({
      type: 'POST',
      url: '/books',
      data: { book: { title: title, author: author, cover: image, link: link}},
      success: function(data) {
      if (typeof(data) == 'object') {
        context.addClass('hide')
        context.siblings('.search__book--notice').removeClass('hide')
        context.siblings('.search__book--added').removeClass('hide')
        console.log('Added!')
      } else {
        context.siblings('.search__book--warning').removeClass('hide')
        console.log('Sorry, you already have this on your list.')
      }},
      error: function() {
      context.siblings('.search__book--warning').html('Sorry, something went wrong.')
      context.siblings('.search__book--warning').removeClass('hide')
      console.log('failed!')
      }
    })
  })

  function clearResults() {
    document.getElementById('no-search').classList.add('hide')
    document.getElementById('search-results').innerHTML = ''
    document.getElementsByClassName('search__results')[0].classList.add('hide')
    document.getElementsByClassName('search')[0].classList.add('full-height')
    document.getElementsByClassName('search__lookup')[0].classList.add('hide')
  }

  function changePagination() {
    $('.pagination .previous_page').addClass('primary-btn prev-btn')
    $('.pagination .next_page').addClass('primary-btn next-btn')
    $('em.current').addClass('primary-btn')


    $('.pagination .previous_page').html('<span class="prev">←</span> Prev')
    $('.pagination .next_page').html('Next <span class="next">→</span>')
  }

  function delayPagination(l) {

    for (var i = 0; i <= l;i = i + 200) {
      setTimeout(function() {
        changePagination()
      }, i)
    }
  }

  $('html').on('click','nav a', function() {
    // clear search results when clicking links that are not search and if coming out of search
    if ($(this).attr('href') != '/search' && window.location.pathname == '/search') {
      clearResults()
    }
    // when /books.. is clicked and current window is not /books then replace pagination
    if ($(this).attr('href') == '/books' && window.location.pathname.slice(0,7) !== '/books') {
      delayPagination(1500)
    }
  })

  // changes pagination on refresh
  window.onload = function() {
    if (window.location.pathname.slice(0,7) == '/books') {
      changePagination()
    }
  }
  // changes when user hits prev or next
  $('html').on('click','.pagination a', function() {
    if (window.location.pathname.slice(0,7) == '/books') {
      delayPagination(1000)
    }
  })
})