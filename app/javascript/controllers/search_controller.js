var books = require('google-books-search')

var options = {
    limit: 30
}


function scrollTop() {
  $("html, body").animate({ scrollTop: $('.search').offset().top }, 300)
}


import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input','output','page']

  initialize() {
    this.showCurrentPage()
  }

  next() {
    if (this.index == 0) {
      $('.page-1').removeClass('page-1')
    }
    this.index++
    scrollTop()
  }

  page() {
    scrollTop()
  }

  previous() {
    this.index--
    scrollTop()
  }

  showCurrentPage() {
    this.pageTargets.forEach((el, i) => {
      el.classList.toggle("page--current", this.index == i)
    })
  }

  get index() {
    return parseInt(this.data.get("index"))
  }

  set index(value) {
    this.data.set("index", value)
    this.showCurrentPage()
  }

  connect() {
    console.log('search_controller loaded!')
  }

  get input() {
    return this.inputTarget.value.trim()
  }

  get output() {
    return this.outputTarget
  }

  paginate() {
    console.log('paginate clicked!')
  }

  list(event) {
    event.preventDefault()
    this.inputTarget.value = this.input
    this.output.textContent = `"${this.input}"`
    $('section.search').attr('data-search-index', 0)

    function truncate(title) {
      if (title.length > 40) {
        return title.substr(0,40) + '...'
      } else {
        return title
      }
    }

    function prependURL(url) {
      if (url.substr(0, 8) !== 'http://' ) {
        return 'https://' + url.substr(7, url.length)
      } else {
        return url
      }
    }

    var bookResults = []

    if (this.input.length != 0) {
      books.search(this.input, options, function(error, results) {
        if (!error) {
          results.filter(function(result) {
            return !(result.title == undefined || result.authors == undefined || result.thumbnail == undefined)
          }).every(function(result, index) {
            bookResults.push({ title: truncate(result.title), author: result.authors[0], thumbnail: prependURL(result.thumbnail)})

            if (index == 27) {
              return false
            } else {
              return true
            }
          })

          function paginateBooks(arr, size) {
            var bookSets = []
            var j = 0
            var page

            $('#search-results').html('')

            for (var i = 0; i < Math.ceil(arr.length / size); i++) {
              bookSets[i] = arr.slice(j, j + size)
              j = j + size
            }

            bookSets.map(function(sets, index) {
              $('#search-results').append(`<div data-target="search.page" class="search__set page page-${index+1}"></div>`)
              page = index + 1

              for (var i = 0; i <= sets.length - 1; i ++) {
                $('.search__set:nth-of-type(' + page + ')').append(`
                  <li class="search__book">
                    <div class="search__book--detail">
                      <img class="search__image" src="${sets[i].thumbnail}" alt="${sets[i].title} cover">
                      <div class="search__info">
                        <p class="search__title">${sets[i].title}<p>
                        <p class="search__author">${sets[i].author}</p>
                      </div>
                    </div>
                    <button class="search__book--action primary-btn">Add Book</button>
                  </li>`)
              }
            })

            $('.search__results').removeClass('hide')
            $('.search').removeClass('full-height')
            $('.results__copy').removeClass('hide')

            $('.search__set').append(`<div class="pagination">
              <button class="primary-btn" data-action="search#previous">← Prev</button>
              <button class="primary-btn page-number" data-action="search#page"></button>
              <button class="primary-btn" data-action="search#next">Next →</button>
              </div>`)

            for (var n = 1; n <= Math.ceil(arr.length / size); n++) {
              $('.search__set:nth-of-type(' + n + ') .pagination .page-number').append(n)
            }

            $('.search__set:nth-of-type(1) button:nth-of-type(1)').addClass('hide')
            $('.search__set:nth-of-type(' + Math.ceil(arr.length/size) + ') button:nth-of-type(3)').addClass('hide')
            $('.search__set .search__book:first-child').addClass('search__book--first')
          }
          paginateBooks(bookResults, 7)

        } else {
          console.log(error)
        }
      })
    } else {
      $('#search-results').html('')
      $('.search__results').addClass('hide')
      $('.search').addClass('full-height')
      $('.results__copy').addClass('hide')
    }
  }
}
