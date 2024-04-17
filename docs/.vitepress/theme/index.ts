import Theme from 'vitepress/theme'
import EditInfo from '../components/edit-info.vue'
import { insertBaiduScript } from './insert-baidu-script'
import './vars.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('EditInfo', EditInfo)
    insertBaiduScript()
  }
}
