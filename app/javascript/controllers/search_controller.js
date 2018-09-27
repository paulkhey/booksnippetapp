var books = require('google-books-search')

var options = {
    offset: 0,
    limit: 15,
}

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input','output' ]

  connect() {
    console.log('Search Controller loaded!')
  }

  get input() {
    return this.inputTarget.value
  }

  list(event) {
    event.preventDefault()
    this.outputTarget.textContent = `You searched for "${this.input}"`
    var bookResults = []

    books.search(this.input, options, function(error, results) {
        if (!error) {
          results.filter(function(result) {
            return !(result.title == undefined && result.authors == undefined && result.thumbnail == undefined)
          }).map(function(result, index) {
              bookResults.push({ title: result.title, author: result.authors[0], thumbnail: result.thumbnail})
          })

          var myList = ''

          for ( var i = 0; i < 14; i++) {
            if (i === 10) {
                break;
            }

            myList += `
            <li class="search__book">
                <img class="search__image" src="${bookResults[i].thumbnail}" alt="${bookResults[i].title} cover">
                <div class="search__info">
                  <p class="search__title">${bookResults[i].title}<p>
                  <p class="search__author">${bookResults[i].author}</p>
                </div>
              </li>
            `
          }

          myList+=
          document.getElementById('search-results').innerHTML = myList

        } else {
            console.log(error);
            document.getElementById('search-results').innerHTML = '<p style="text-align:center">Sorry, something went wrong.</p>'
        }
    });
  }
}
