import { h } from 'vue'
import Theme from 'vitepress/theme'
import Scene from '@kagol/snow-effect'
import EditInfo from '../components/edit-info.vue'
import Footer from '../components/footer.vue'
import { insertBaiduScript } from './insert-baidu-script'
import './style.css'

export default {
  ...Theme,
  enhanceApp({ app, router }) {
    app.component('EditInfo', EditInfo)
    insertBaiduScript()

    const enableSnow = false

    if (!enableSnow) return

    // 下雪效果
    if (typeof document === 'undefined') return

    // 只要冬天才下雪
    const month = new Date().getMonth() + 1
    if (![12, 1, 2].includes(month)) return

    let scene

    router.onBeforeRouteChange = (to) => {
      if (to === '/blogs/') {
        scene = new Scene('body', {
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
      } else {
        scene && scene.destroyScene()
      }
    }
  },
  Layout: () => {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(Footer),
    })
  }
}
