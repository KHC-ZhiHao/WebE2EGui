<template>
    <v-dialog v-model="dialog" persistent width="80%" scrollable>
        <v-card dark>
            <v-card-title :class="done ? (totalError === 0 ? 'success--text' : 'error--text') : ''">
                {{ done ? `執行完畢，共計錯誤為：${totalError}` : `請等待執行完畢` }}
                <v-spacer></v-spacer>
                <v-btn v-if="done === true" text @click="copyReport">複製報告</v-btn>
            </v-card-title>
            <v-card-text>
                <p v-for="(text, index) in result" :key="index + text" v-html="text"></p>
                <p v-if="done && errorTest.length > 0" style="color: red">錯誤的測試：{{ errorTestReport.join(', ') }}</p>
                <div ref="done"></div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="done === false" text @click="dialog = false">關閉</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { exec } from 'child_process'
import { mapGetters, mapActions } from 'vuex'
import audioBase64 from './audio-base64'

const stripAnsi = require('strip-ansi')
const audio = new Audio('data:audio/wav;base64,' + audioBase64)
audio.volume = 0.5

export default {
    data() {
        return {
            done: false,
            dialog: false,
            result: [],
            nowTest: null,
            errorTest: [],
            totalError: 0
        }
    },
    watch: {
        dialog() {
            this.done = false
            this.result = []
            this.totalError = 0
            this.nowTest = null
            this.errorTest = []
        }
    },
    computed: {
        ...mapGetters({
            project: 'project/project'
        }),
        errorTestReport() {
            return [...new Set(this.errorTest)]
        }
    },
    methods: {
        ...mapActions({
            showSuccess: 'message/showSuccess'
        }),
        play(id) {
            this.dialog = true
            this.project.$m.write(id)
            try {
                let process = exec(`protractor "${outputDir}/config.js"`)
                process.stdout.on('data', data => {
                    this.parseEvent(data)
                    this.result.push(this.parseResult(data))
                    setTimeout(() => {
                        this.$refs.done.parentNode.scrollTo(0, 99999999)
                    }, 100)
                })
                process.on('exit', () => {
                    this.done = true
                })
            } catch (error) {
                console.error(error)
            }
        },
        concatParent(spec) {
            let output = spec.steps.items.slice()
            if (spec.parent) {
                let parent = this.project.specs.items.find(s => s.id === spec.parent)
                if (parent) {
                    output = this.concatParent(parent).concat(output)
                }
            }
            return output
        },
        parseResult(data) {
            let message = stripAnsi(data).trim()
            if (message === '.') {
                return `<font color="chartreuse">Success</font>`
            }
            if (message === 'F') {
                this.totalError += 1
                this.errorTest.push(this.nowTest)
                return `<font color="red">Fail</font>`
            }
            if (message.match('測試 =>')) {
                this.nowTest = message.replace('測試 =>', '').trim()
                return `<font color="yellow">${message}</font>`
            }
            if (message.match('執行 =>')) {
                return `<font color="aqua">${message}</font>`
            }
            if (message.match('執行完畢')) {
                return `<font color="orchid">${message}</font>`
            }
            return message
        },
        parseEvent(data) {
            let event = data.trim().split('@event:')[1]
            if (event) {
                if (event === 'play-sound') {
                    audio.play()
                }
            }
        },
        copyReport() {
            let clipboard = nw.Clipboard.get()
            clipboard.set(this.result.join('\n\n'), 'text')
            this.showSuccess('複製成功')
        }
    }
}
</script>