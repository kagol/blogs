import { h } from 'vue'
import Theme from 'vitepress/theme'
import Scene from '@kagol/snow-effect'
import EditInfo from '../components/edit-info.vue'
import Footer from '../components/footer.vue'
import { insertBaiduScript } from './insert-baidu-script'
import './style.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('EditInfo', EditInfo)
    insertBaiduScript()

    // 下雪效果
    if (typeof document === 'undefined') return

    const scene = new Scene('body', {
      color: "#FFFFFF",
      opacity: 1,
      density: 20,
      fall_speed: 4,
      size: 20,
      zIndex: "999",
      show: true,
      images: [
        '/blogs/images/snowflakes-1.png',
        '/blogs/images/snowflakes-2.png',
        '/blogs/images/snowflakes-3.png',
        '/blogs/images/snowflakes-4.png',
        '/blogs/images/snowflakes-5.png',
        '/blogs/images/snowflakes-6.png',
        '/blogs/images/snowflakes-7.png',
        '/blogs/images/snowflakes-8.png',
      ]
    })

    scene.start()
  },
  Layout: () => {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(Footer),
    })
  }
}
