<template>
    <v-app>
        <self-confirm></self-confirm>
        <self-message></self-message>
        <v-main v-if="$.connected">
            <div v-if="$.started === false" class="text-center">
                <img src="/images/logo2.png" style="width: 90%; max-width: 400px">
                <div>
                    <v-btn @click="$.started = true" color="primary">開始使用</v-btn>
                    <div class="mt-5">
                        <v-btn icon href="https://github.com/KHC-ZhiHao/WEB-E2E-GUI" target="_blank">
                            <v-icon>mdi-github</v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
            <router-view v-else></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import socket from '@/socket'
import Confirm from '@/layout/confirm.vue'
import Message from '@/layout/message.vue'
import { defineComponent, onMounted, reactive } from '@vue/composition-api'
export default defineComponent({
    components: {
        'self-confirm': Confirm,
        'self-message': Message
    },
    setup() {

        let $ = reactive({
            started: true,
            connected: false
        })

        onMounted(async() => {
            await socket.connect()
            $.connected = true
        })

        return {
            $
        }
    }
})
</script>
