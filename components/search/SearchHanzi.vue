<script setup lang="ts">
import Card from "./Card.vue";
import { type SearchCardsPropsArray } from "./share";
defineProps<{
    result: SearchCardsPropsArray
}>()
</script>

<template>
    <div class="flex justify-center flex-wrap my-8">
        <Card v-for="r of result" :key="r.zi" :name="r.zi" :data="r.data" />
    </div>
</template>