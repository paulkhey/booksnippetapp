var books = require('google-books-search')
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    console.log('Search Controller loaded!')
  }

  get input() {
    return this.inputTarget.value
  }

  list(event) {
    event.preventDefault()
    books.search(this.input, function(error, results) {
        if ( ! error ) {
            document.getElementById('search').innerHTML = `
              <ul>
                <li>${results[0].title} by ${results[0].authors[0]} ${results[0].thumbnail}</li>
                <li>${results[1].title} by ${results[1].authors[1]} ${results[0].thumbnail}</li>
                <li>${results[2].title} by ${results[2].authors[2]} ${results[0].thumbnail}</li>
              </ul>
            `
            console.log(results[0]);
            console.log(results[1]);
            console.log(results[2]);
        } else {
            console.log(error);
            document.getElementById('search').innerHTML = "<p>Sorry, something went wrong.</p>"
        }
    });
  }
}
