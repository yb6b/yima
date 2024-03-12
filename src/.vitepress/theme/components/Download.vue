<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
defineProps<{
    urls: [filename: string, zhName: string][][]
}>()

const mirrorPrefix = 'https://mirror.ghproxy.com/'
const repoReleaseUrlPrefix = 'https://github.com/yb6b/yima/releases/download/'

const mirrorRef = useLocalStorage('yima-download-mirror', false)
const prefix = computed(() => mirrorRef.value ? (mirrorPrefix + repoReleaseUrlPrefix) : repoReleaseUrlPrefix)

const getUrl = (url: string) => prefix.value + url
</script>

<template>
    <div>
        <ul v-for="blocks in urls">
            <li v-for="pairs in blocks">
                <a :href="getUrl(pairs[0])" :download="pairs[1]" target="_blank">{{ pairs[1] }}</a>
            </li>
        </ul>
        <input type="checkbox" id="mirror" v-model="mirrorRef" />
        <label for="mirror">使用代理网站加速下载</label>
    </div>
</template>