import { h } from 'vue'
import Theme from 'vitepress/theme'
import EditInfo from '../components/edit-info.vue'
import Footer from '../components/footer.vue'
import { insertBaiduScript } from './insert-baidu-script'
import './style.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('EditInfo', EditInfo)
    insertBaiduScript()
  },
  Layout: () => {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(Footer),
    })
  }
}
