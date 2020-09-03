<template>
    <v-dialog v-model="$.dialog" persistent width="80%" scrollable>
        <v-card dark>
            <v-card-title>
                {{ $.done ? `安裝完畢` : `正在安裝依賴...` }}
            </v-card-title>
            <v-card-text>
                <p v-for="(text, index) in $.result" :key="index + text" v-html="text"></p>
                <div ref="done"></div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="$.done === false" text @click="$.dialog = false">關閉</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import socket from '@/socket'
import { Self, RefElement } from '@/vue-core'
import { action } from '@/alas'
import { defineComponent, reactive, onMounted, watch, ref } from '@vue/composition-api'
export default defineComponent({
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // ref
        //

        let done: RefElement<any> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({
            done: false,
            dialog: false,
            result: []
        })

        // =================
        //
        // watch
        //

        watch(() => $.dialog, () => {
            $.done = false
            $.result = []
        })

        // =================
        //
        // methods
        //

        let close = () => {
            setTimeout(() => {
                $.dialog = false
            }, 100)
        }

        let open = async(project) => {
            $.dialog = true
            try {
                let packages = project.dependencies.items.map(s => s.name + '@' + s.version)
                let script = `npm install -g protractor & webdriver-manager update & npm install request-promise ${packages.join(' ')} --no-save`
                socket.exec(script, (type, data) => {
                    if (type === 'exit') {
                        self.emit('done')
                        $.done = true
                    } else {
                        $.result.push(data)
                        setTimeout(() => done.value.parentNode.scrollTo(0, 99999999), 100)
                    }
                })
                self.nextTick(() => $.result.push(script))
            } catch (error) {
                action.message('error', error)
            }
        }

        // =================
        //
        // done
        //

        return {
            $,
            open,
            done,
            close
        }
    }
})
</script>