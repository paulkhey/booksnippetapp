var books = require('google-books-search')

var options = {
    limit: 40
}

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ 'input','output' ]

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
    this.output.textContent = `${this.input}`
    function truncate(title) {
      if (title.length > 62) {
        return title.substr(0,62) + '...'
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
            // myList += `
            //   <li class="search__book">
            //     <img class="search__image" src="${bookResults[index].thumbnail}" alt="${bookResults[index].title} cover">
            //     <div class="search__info">
            //       <p class="search__title">${bookResults[index].title}<p>
            //       <p class="search__author">${bookResults[index].author}</p>
            //     </div>https://www.npmjs.com/package/paginate-array?activeTab=dependencies
            //   </li>
            // `

            if (index == 11) {
              return false
            } else {
              return true
            }
          })

          function paginateBooks(arr, size) {
            var bookSets = [];
            var j = 0;
            $('#search-results').html('')

            for (var i = 0; i < Math.ceil(arr.length / size); i++) {
              bookSets[i] = arr.slice(j, j + size);
              j = j + size;
            }

            bookSets.map(function(sets, index) {
              $('#search-results').append(`<div class="search__sets page-${index+1}" >Page ${index + 1}</div>`)

              for (var i = 0; i <= sets.length - 1; i ++) {
                // console.log('')
                // console.log(sets[i].title)
                // console.log(sets[i].author)
                // console.log(sets[i].thumbnail)
                console.log(i)
                $('.search__sets:nth-of-type(' + index).append(`
                  <li>
                    <div class="search__book">
                      <img class="search__image" src="${sets[i].thumbnail}" alt="${sets[i].title} cover">
                      <div class="search__info">
                        <p class="search__title">${sets[i].title}<p>
                        <p class="search__author">${sets[i].author}</p>
                      </div>
                    </div>
                  </li>`)
              }
              console.log('')
            })

          }
          paginateBooks(bookResults, 3)
        } else {
          console.log(error)
        }
      })



    // var myList = ''
    // document.getElementById('search-results').innerHTML = myList

    } else {
      $('#search-results').html('')
    }
  }
}
