const books = require('google-books-search')

const options = {
    limit: 40,
    order: 'relevance'
}

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input','output','page','order']

  initialize() {
    this.showCurrentPage()
  }

  get index() {
    return parseInt(this.data.get("index"))
  }

  set index(value) {
    this.data.set("index", value)
    this.showCurrentPage()
  }

  get input() {
    return this.inputTarget.value.trim()
  }

  get output() {
    return this.outputTarget
  }

  get order() {
    return this.orderTarget.value
  }

  scrollTop() {
    $("html, body").animate({ scrollTop: $('.search__results').offset().top }, 100)
  }

  sort() {
    if (this.order == 'Date') {
      options.order = 'newest'
    } else if (this.order == 'Relevance') {
      options.order = 'relevance'
    }
    this.list()
  }

  next() {
    if (this.index == 0) {
      $('.page-1').removeClass('page-1')
    }
    this.index++
    this.scrollTop()
  }

  previous() {
    this.index--
    this.scrollTop()
  }

  showCurrentPage() {
    this.pageTargets.forEach((el, i) => {
      el.classList.toggle("page--current", this.index == i)
    })
  }

  list(event) {
    if (event) {
      event.preventDefault()
    }

    const bookResults = []
    this.inputTarget.value = this.input
    this.output.textContent = `"${this.input}"`
		document.getElementsByClassName('search')[0].setAttribute('data-search-index', 0);

    function prependURL(url) {
      if (url.substr(0, 8) !== 'http://' ) {
        return 'https://' + url.substr(7, url.length)
      } else {
        return url
      }
    }
    
    function removeChar(title) {
      var newTitle = title.replace('&', 'and')
      return newTitle
    }

    function clearResults() {
      document.getElementsByClassName('search')[0].classList.add('top')
      document.getElementById('no-search').classList.remove('hide')
      document.getElementById('search-results').classList.add('hide')
      document.getElementById('search-results').innerHTML = ''
      document.getElementsByClassName('search__results')[0].classList.add('hide')
      document.getElementsByClassName('search__lookup')[0].classList.add('hide')
    }

    function showResults() {
      document.getElementsByClassName('search')[0].classList.remove('top')
      document.getElementById('no-search').classList.add('hide')
      document.getElementById('search-results').classList.remove('hide')
      document.getElementsByClassName('search')[0].classList.remove('full-height')
      document.getElementsByClassName('search__lookup')[0].classList.remove('hide')
    }

    function sliceBooks(arr, pages, size, bookSets) {
      let j = 0

      for (let i = 0; i < pages; i++) {
        bookSets[i] = arr.slice(j, j + size)
        j = j + size
      }
    }

    function addPageNumbers(pages) {
      $('.search__set').append(`<div class="pagination">
      <button class="primary-btn prev-btn" data-action="search#previous" aria-label="Previous page"><span class="prev">←</span> Prev</button>
      <div class="primary-btn page-number" aria-label="Current page"></div>
      <button class="primary-btn next-btn" data-action="search#next" aria-label="Next page">Next <span class="next">→</span></button>
      </div>`)

      for (let n = 1; n <= pages; n++) {
        $('.search__set:nth-of-type(' + n + ') .pagination .page-number').append(n)
      }

      $('.search__set:nth-of-type(1) .pagination button[data-action="search#previous"]').addClass('hide')
      $('.search__set:nth-of-type(' + pages + ') button[data-action="search#next"]').addClass('hide')
      $('.search__set .search__book:first-child').addClass('search__book--first')
    }

    function uniqueBooks(sets) {
      return (sets.reduce((unique, o) => {
        if(!unique.some(obj => obj.title.toLowerCase() === o.title.toLowerCase() && obj.value === o.value)) {
          unique.push(o);
        }
        return unique;
      },[]))
    }

    function booksWithValues(result) {
      return !(result.id == undefined || result.title == undefined || result.authors == undefined || result.thumbnail == undefined || result.pageCount == undefined || result.publishedDate == undefined || result.link == undefined)
    }

    function paginateBooks(arr, size) {
      const bookSets = []
      const pages = Math.ceil(arr.length/size)
      clearResults()
      sliceBooks(arr, pages, size, bookSets)

      bookSets.forEach(function(sets, index) {
        sets = uniqueBooks(sets)
        document.getElementById('search-results').innerHTML += `<div data-target="search.page" class="search__set page page-${index+1}"></div>`

        sets.forEach(function(set) {
          $('.search__set:nth-of-type(' + (index + 1)  + ')').append(`
          <li class="search__book">
            <div class="search__book--detail">
              <a href="${set.link}" target="_blank"><img class="search__image" src="${set.thumbnail}" alt="${removeChar(set.title)} cover"></a>
              <div class="search__info">
                <a href="${set.link}" target="_blank"><p class="search__title">${removeChar(set.title)}</p></a>
                <p class="search__author">by <span style="color: #003bcc; font-weight: bold">${set.author}</span></p>
                <p class="search__date"><strong>Published:</strong> ${moment(set.publishedDate, 'YYYY-MM-DD').format('MMMM D, YYYY')}</p>
                <p class="search__pages"><strong>Length:</strong> ${set.pageCount} Pages</p>
              </div>
            </div>
            <button class="search__book--action primary-btn" aria-label="Add book">Add Book</button>
            <div class="search__book--added primary-btn success-btn hide" aria-label="Book added">Added!</div>
            <p class="search__book--warning hide" aria-label="Book warning" style="color: red">This book is already on your list.</p>
            <a href="/books" class="search__book--notice hide" aria-label="Book notice" style="color: #00b939">Go to your list of books!</a>
          </li>`)
        })
      })
      showResults()
      addPageNumbers(pages)
    }

    if (this.input.length != 0) {
      books.search(this.input, options, function(error, results) {
      if (!error) {
        results.filter((result) => booksWithValues(result)).every((result, index) => {
          bookResults.push({
            id: result.id,
            title: result.title,
            author: result.authors[0],
            thumbnail: prependURL(result.thumbnail),
            pageCount: result.pageCount,
            publishedDate: result.publishedDate,
            link: result.link
          })

        if (index == 32) {
          return false
        } else {
          return true
        }
    })
    paginateBooks(bookResults, 7)
    } else {
      clearResults()
      document.getElementById('search-results').innerHTML = '<p style="font-weight:bold; text-align:center;width:100%">Sorry, try again.</p>'
      console.log(error)
    }})
    } else {
      clearResults()
    }
  }
}
