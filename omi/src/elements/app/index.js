import { define, WeElement } from 'omi'
import '../app-header'
import '../app-markdown'
import 'omiu/button'

define('my-app', class extends WeElement {
  render() {
    return (
      <div class="app">
        <app-header />
        <app-markdown />
      </div>
    )
  }
})
