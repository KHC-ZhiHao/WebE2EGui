<template>
    <div>
        <router-view v-if="project.$ready"></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            project: 'project/project'
        })
    },
    mounted() {
        this.fetch(this.$route.params.project)
        this.save()
        this.$core.reloadCustom(this.project)
    },
    methods: {
        ...mapActions({
            save: 'project/save',
            fetch: 'project/fetch'
        }),
        ...mapMutations({
            reset: 'project/reset'
        }),
        ...mapMutations({
            resetCopy: 'copy/reset'
        })
    },
    destroyed() {
        this.save()
        this.reset(['project'])
        this.resetCopy()
        this.$core.clearCustom()
    }
}
</script>