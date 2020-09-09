<template>
    <v-dialog v-model="$.dialog" scrollable>
        <v-card color="grey lighten-4">
            <v-card-title>
                <span>選擇測試</span>
                <v-spacer></v-spacer>
                <v-checkbox label="全選" :input-value="$.selected.length === $.project.specs.size" @click.stop="selectAll"></v-checkbox>
            </v-card-title>
            <v-card-text>
                <div v-for="(group, index) in $.project.groups.items" :key="index + 't'">
                    <div class="title">{{ group.name }}</div>
                    <v-divider class="mt-3 mb-1"></v-divider>
                    <v-row>
                        <template v-for="(spec, index) in $.project.specs.items">
                            <v-col
                                :key="index"
                                :cols="4"
                                v-if="spec.group === group.id">
                                <v-card class="pa-5">
                                    <v-row align="center">
                                        <div class="ml-3">{{ spec.name }}</div>
                                        <v-spacer></v-spacer>
                                        <v-checkbox hide-details class="pa-0 ma-0" v-model="$.selected" :value="spec"></v-checkbox>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </template>
                    </v-row>
                </div>
                <div v-if="$.project.specs.views.hasNoCategory">
                    <div class="title">無分類</div>
                    <v-divider class="mt-3 mb-1"></v-divider>
                    <v-row>
                        <template v-for="(spec, index) in $.project.specs.items">
                            <v-col
                                :key="index"
                                :cols="4"
                                v-if="!$.project.groups.fetch(spec.group)">
                                <v-card class="pa-5">
                                    <v-row align="center">
                                        <div class="ml-3">{{ spec.name }}</div>
                                        <v-spacer></v-spacer>
                                        <v-checkbox hide-details class="pa-0 ma-0" v-model="$.selected" :value="spec"></v-checkbox>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </template>
                    </v-row>
                </div>
            </v-card-text>
            <v-btn
                tile
                block
                color="primary"
                :disabled="$.selected.length === 0"
                @click="confirm">
                確定
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { status } from '@/alas'
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    props: {},
    setup() {

        // =================
        //
        // state
        //

        let $ = reactive({
            project: status.fetch('project'),
            dialog: false,
            callback: null,
            selected: []
        })

        // =================
        //
        // methods
        //

        let open = (callback) => {
            $.selected = []
            $.callback = callback
            $.dialog = true
        }

        let selectAll = () => {
            if ($.selected.length === $.project.specs.size) {
                $.selected = []
            } else {
                $.project.specs.forEach(model => {
                    if ($.selected.includes(model) === false) {
                        $.selected.push(model)
                    }
                })
            }
        }

        let confirm = () => {
            $.dialog = false
            $.callback($.selected)
        }

        // =================
        //
        // done
        //

        return {
            $,
            open,
            selectAll,
            confirm
        }
    }
})
</script>
