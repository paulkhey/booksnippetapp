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
  function addBook() {
    $('.search__results').on('click','.search__book--action', function() {
      var book = $(this).siblings('.search__book--detail')
      var bookinfo = book.children('.search__info')
      var title = bookinfo.children('a').children('.search__title').html()
      var author = bookinfo.children('.search__author').children('span').html()
      var image = book.children('a').children('img.search__image').attr('src')
      console.log(title)
      console.log(author)
      console.log(image)
      $(this).addClass('hide')
      $(this).siblings('.search__book--added').removeClass('hide')


      $.ajax({
        type: 'POST',
        url: '/books',
        data: { book: { title: title, author: author, cover: image}},
        success: function(data) {
          console.log('Success')
          console.log(data)
        },
        error: function() {
          console.log('failed!')
        }
      })
    })
  }

  addBook()
})