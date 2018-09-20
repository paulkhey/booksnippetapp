import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    console.log('Search Controller loaded!')
  }

  list(event) {
    event.preventDefault()
    console.log(this.inputTarget.value)
  }
}
