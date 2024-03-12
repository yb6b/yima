<script setup lang="ts">
import Card from "./Card.vue";
import { type Result } from "./share";
defineProps<{
    result: Result
}>()
</script>

<template>
    <div class="flex justify-center flex-wrap my-8">
        <Card v-for="r of result" :key="r[0]" :hanzi="r[0]" :comp="r[1]" :keys="r[2]" />
    </div>
</template>