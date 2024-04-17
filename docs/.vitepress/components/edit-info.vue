<script setup lant="ts">
defineProps({
  time: String
})
</script>

<template>
  <div class="edit-info">
    <div class="last-updated">
      <p class="VPLastUpdated">发布时间：<time>{{ time }}</time></p>
    </div>
  </div>  
</template>

<style scoped lang="scss">
.edit-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 14px;
}

.VPLastUpdated {
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(60 60 67 / 75%);
}
</style>
