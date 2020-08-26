<template>
    <div id="custom-btn" class="grey lighten-3 px-1" style="height: calc(100vh - 56px)">
        <ui-app-bar :title="'自定義按鈕 - ' + project.name" :back="{ name: 'project' }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" small icon href="https://github.com/KHC-ZhiHao/WEB-E2E-GUI" target="_blank">
                        <v-icon>mdi-help-circle-outline</v-icon>
                    </v-btn>
                </template>
                <span>前往GITHUB觀看說明</span>
            </v-tooltip>
        </ui-app-bar>
        <v-row class="px-5 pt-2">
            <v-col cols="3">
                <v-card class="custom-btn-card" ref="list">
                    <v-list class="py-0">
                        <v-list-item
                            v-for="(btn, index) in project.customBtns.items"
                            :key="index + 'btn'"
                            :class="target === btn ? 'blue-grey lighten-5' : ''"
                            @click="select(btn)">
                            <v-list-item-content>
                                <v-list-item-title>{{ btn.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-toolbar dense class="mt-2 elevation-1">
                    <v-btn text block @click="create">加入一個按鈕</v-btn>
                </v-toolbar>
            </v-col>
            <v-col cols="9">
                <v-card class="custom-btn-card">
                    <codemirror
                        v-if="target"
                        v-model="target.script"
                        @input="verifyContent"
                        :options="{ mode: 'text/javascript' }"
                    ></codemirror>
                    <div v-else class="pa-4 grey--text">點選按鈕編輯</div>
                </v-card>
                <v-toolbar dense class="mt-2 elevation-1">
                    <span v-if="compile" class="red--text">{{ compile }}</span>
                    <span v-else class="grey--text">無異常</span>
                </v-toolbar>
            </v-col>
        </v-row>
        <ui-form title="建立按鈕" ref="create">
            <v-alert dense outlined type="error">為了確保測試不會造成依賴失敗，建立後無法刪除按鈕</v-alert>
            <v-text-field v-model="createName" label="名稱" outlined :rules="$alas.rules(['#ms.required'])"></v-text-field>
        </ui-form>
    </div>
</template>

<style>

.custom-btn-card {
    height: calc(100vh - 152px);
    overflow: auto;
}

#custom-btn .CodeMirror {
    overflow-y: scroll !important;
    height: calc(100vh - 152px) !important;
}

</style>

<script>
import beautify from 'js-beautify'
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            target: null,
            compile: null,
            createName: ''
        }
    },
    computed: {
        ...mapGetters({
            project: 'project/project'
        })
    },
    methods: {
        getBtnScript() {
            let script = `
                {
                    info: '等待',
                    help: '詳細說明',
                    color: '#000000',
                    btnText: '等待',
                    props: {
                        value: {
                            type: 'text',
                            info: '毫秒',
                            default: '1000'
                        }
                    },
                    display(props) {
                        return '等待' + props.value + '毫秒'
                    },
                    validate(props) {
                        let result = Number(props.value)
                        if (isNaN(result)) {
                            return '必須為數字'
                        } else {
                            return true
                        }
                    },
                    write(props) {
                        return 'await browser.sleep(' + props.value + ')'
                    }
                }
            `
            return beautify.js(script.trim(), {
                indent_size: 8
            })
        },
        select(btn) {
            this.target = btn
            this.$forceUpdate()
        },
        create() {
            this.$refs.create.open(() => {
                if (this.project.customBtns.fetch(this.createName)) {
                    alert('按鈕已經存在')
                } else {
                    this.project.customBtns.write({
                        name: this.createName,
                        script: this.getBtnScript()
                    })
                    this.target = this.project.customBtns.fetch(this.createName)
                    this.$forceUpdate()
                    this.$nextTick(() => {
                        this.$refs.list.$el.scrollTo(0, 999999999)
                    })
                }
                this.createName = ''
            })
        },
        async verifyContent() {
            if (this.target == null) {
                this.compile = null
            }
            let result = null
            try {
                eval('result = ' + this.target.script)
            } catch (error) {
                return this.compile = `編譯失敗(${error.message})`
            }
            try {
                this.$core.verifyTemplate({
                    name: 'test',
                    type: 'action',
                    ...result
                })
                this.compile = null
            } catch (error) {
                this.compile = `格式不正確(${error.message})`
            }
        }
    },
    destroyed() {
        this.$core.reloadCustom(this.project)
    }
}
</script>