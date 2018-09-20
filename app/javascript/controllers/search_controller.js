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
    console.log(this.input)
  }
}
