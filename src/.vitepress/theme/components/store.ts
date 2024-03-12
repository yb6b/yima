import { reactive, watch,onMounted } from "vue";

const storeNamePrefix = "yima-"

const globalStore: Record<string, unknown> = reactive({})

onMounted(() => { 
    
 })

watch(globalStore, (value) => {
    localStorage.setItem(storeNamePrefix + 'store', JSON.stringify(value))
})