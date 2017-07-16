<template lang='jade'>
    #main
        TopBar
        .container
            router-view
</template>

<style scoped>
    .container{
        margin-bottom: 100px;
    }
</style>


<script>
import TopBar from '@/components/TopBar'

export default {
    components: {
        TopBar
    }
}
</script>
