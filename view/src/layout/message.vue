<template>
    <div id="message-component">
        <div v-for="(data, index) in $.message.toasts" :key="index + 'e'">
            <v-card
                :color="data.type === 'error' ? 'red lighten-2' : data.type"
                dark
                v-if="index < $.total"
                @click.stop="click(data)"
                class="message-component-card ma-2">
                <v-layout justify-center align-center class="px-3">
                    <v-icon class="mr-2" v-if="data.type === 'error'">mdi-alert-circle-outline</v-icon>
                    <v-icon class="mr-2" v-if="data.type === 'success'">mdi-check</v-icon>
                    <span>({{ data.time }})</span>
                    <div class="message-component-message" style="width: 80%; word-wrap: break-word" v-html="data.message"></div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="remove(index)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-layout>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Self } from '@/vue-core'
import { status } from '@/alas'
import { defineComponent, reactive } from '@vue/composition-api'
export default defineComponent({
    props: {},
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // state
        //

        let $ = reactive({
            total: 5,
            message: status.fetch('message')
        })

        // =================
        //
        // methods
        //
        
        let click = (toast) => {
            toast.clicked = true
        }

        let remove = (index) => {
            $.message.toasts[index].remove = true
            $.message.$m.collecationToast()
        }
        
        let update = () => {
            let clear = false
            let length = $.message.toasts.length
            for (let i = 0; i < length; i++) {
                let toast = $.message.toasts[i]
                if (toast.clicked) continue
                if (toast.time < 0) {
                    toast.remove = true
                    clear = true
                }
                if (i < $.total) {
                    toast.time -= 1
                }
            }
            if (clear) {
                $.message.$m.collecationToast()
            }
        }

        // =================
        //
        // timer
        //

        self.timer('count', 1000, () => {
            update()
        })

        // =================
        //
        // done
        //

        return {
            $,
            click,
            remove
        }
    }
})
</script>

<style>
    #message-component {
        bottom : 0;
        left : calc(50vw - 150px);
        position : fixed;
        z-index : 2100;
    }
    #message-component .message-component-card {
        width : 80vw;
        max-width : 300px;
    }
    #message-component .message-component-card a {
        margin: 0 5px;
        color: gold;
    }
</style>
