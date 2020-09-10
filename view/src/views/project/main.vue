<template>
    <div>
        <router-view v-if="$.project.$ready"></router-view>
    </div>
</template>

<script lang="ts">
import core from '@/core'
import { Self } from '@/vue-core'
import { status } from '@/alas'
import { defineComponent, reactive, onMounted, onUnmounted } from '@vue/composition-api'
export default defineComponent({
    setup(props, context) {

        let self = new Self(context)

        self.timer('save', 1000, () => $.project.$o.save.start())

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

        onMounted(async() => {
            await $.project.$o.fetch.start({
                name: self.route.params.project
            })
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