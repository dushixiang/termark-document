---
layout: page
title: 跳转中
outline: false
head:
  - - meta
    - http-equiv: refresh
      content: 0;url=./usage/
---

<script setup>
import { onMounted } from 'vue'
import { inBrowser, useRouter, withBase } from 'vitepress'

const router = useRouter()

onMounted(() => {
  if (inBrowser) {
    router.go(withBase('/zh/usage/'), { replace: true })
  }
})
</script>

# 正在跳转到使用文档

如果没有自动跳转，请点击 [继续访问使用文档](./usage/)。
