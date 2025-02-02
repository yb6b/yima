<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
defineProps<{
    urls: [filename: string, zhName: string, repoUrlPrexfix?: string][][]
}>()

const mirrorPrefix = 'https://mirror.ghproxy.com/'
const repoReleaseUrlPrefix = 'https://github.com/yb6b/yima/releases/download/'

const mirrorRef = useLocalStorage('yima-download-mirror', false)
const mirrorUrlRef = computed(() => mirrorRef.value ? mirrorPrefix : '');

const getUrl = (url: string, repoUrlPrexfix?: string) => mirrorUrlRef.value + (repoUrlPrexfix ? repoUrlPrexfix + url : repoReleaseUrlPrefix + url)

</script>

<template>
    <div>
        <ul v-for="blocks in urls">
            <li v-for="pairs in blocks">
                <a :href="getUrl(pairs[0], pairs[2])" :download="pairs[1]" target="_blank">{{ pairs[1] }}</a>
            </li>
        </ul>
        <input type="checkbox" id="mirror" v-model="mirrorRef" />
        <label for="mirror">使用代理网站加速下载</label>
    </div>
</template>