<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import core from '@/core'
import { status } from '@/alas'
import { defineComponent, reactive, onMounted, onUnmounted } from '@vue/composition-api'
export default defineComponent({
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
            project: status.fetch('project')
        })

        // =================
        //
        // mounted
        //

        onMounted(() => {
            core.reloadCustom($.project)
        })

        onUnmounted(async() => {
            await $.project.$o.save.start()
            status.reset('drag')
            status.reset('copy')
            status.reset('project')
            core.clearCustom()
        })

        // =================
        //
        // done
        //

        return {
            $
        }
    }
})
</script>