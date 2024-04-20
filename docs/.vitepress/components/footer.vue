<script setup lang="ts">
import { useSidebar } from 'vitepress/theme'

const { hasSidebar } = useSidebar()
</script>

<template>
  <footer class="k-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <p class="message">Made with ❤ by</p>
      <p class="copyright">Kagol 和 <span class="k-code">前端开源星球<img src="/qrcode.jpeg" width="80" alt="前端开源星球"></span> 公众号🌍</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.k-footer {
  position: relative;
  z-index: var(--vp-z-index-footer);
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);

  &.has-sidebar {
    display: none;
  }
}

@media (min-width: 768px) {
  .k-footer {
    padding: 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.message, .copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.k-code {
  position: relative;
  display: inline-block;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
  color: rgb(255, 80, 44);
  padding: 0.065em 0.4em;
}

.k-code:hover img {
  opacity: 1;
  visibility: visible;
}

.k-code img {
  position: absolute;
  left: calc(50% - 40px);
  top: -104px;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;
}
</style>
