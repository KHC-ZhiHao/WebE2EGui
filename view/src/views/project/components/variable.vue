<template>
    <v-card>
        <v-card-title primary-title>變數</v-card-title>
        <v-divider class="mb-5 mt-1"></v-divider>
        <v-card-text>
            <div v-if="project.variables.size === 0" class="mt-1 body-2 grey--text">本專案沒有變數</div>
            <v-row
                v-for="(variable, index) in project.variables.items"
                :key="index + 't'"
                hide-details
                no-gutters
                align="center"
                class="mt-3 mx-0">
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="variable.key" label="key"></v-text-field>
                </v-col>
                <v-col cols="5" class="mr-2">
                    <v-text-field dense outlined hide-details v-model="variable.value" label="value"></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn outlined @click="remove(variable.id)">
                        刪除
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-btn tile block color="primary" class="mt-2" @click="addVariable">加入一個變數</v-btn>
    </v-card>
</template>

<script>
export default {
    props: ['project'],
    methods: {
        remove(id) {
            this.project.variables.remove(id)
        },
        addVariable() {
            this.project.variables.write({
                key: '',
                value: ''
            })
        }
    }
}
</script>
