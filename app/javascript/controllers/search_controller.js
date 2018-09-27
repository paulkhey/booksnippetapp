var books = require('google-books-search')

var options = {
    limit: 20
}

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input','output' ]

  connect() {
    console.log('Search Controller loaded!')
  }

  get input() {
    return this.inputTarget.value.trim()
  }

  list(event) {
    event.preventDefault()
    this.inputTarget.value = this.input
    this.outputTarget.textContent = `You searched for "${this.input}"`
    function truncate(title) {
      if (title.length > 62) {
        return title.substr(0,62) + '...'
      } else {
        return title
      }
    }
    var bookResults = []
    books.search(this.input, options, function(error, results) {
      if (!error) {
        var myList = ''
        results.filter(function(result) {
          return !(result.title == undefined || result.authors == undefined || result.thumbnail == undefined)
        }).every(function(result, index) {
          bookResults.push({ title: truncate(result.title), author: result.authors[0], thumbnail: result.thumbnail})
          myList += `
            <li class="search__book">
              <img class="search__image" src="${bookResults[index].thumbnail}" alt="${bookResults[index].title} cover">
              <div class="search__info">
                <p class="search__title">${bookResults[index].title}<p>
                <p class="search__author">${bookResults[index].author}</p>
              </div>
            </li>
          `
          if (index == 9) {
            return false
          } else {
            return true
          }
        })
        myList +=
        document.getElementById('search-results').innerHTML = myList
      } else {
        console.log(error)
        document.getElementById('search-results').innerHTML = '<p style="text-align:center">Sorry, something went wrong.</p>'
      }
    });
  }
}
