<template>
    <div id="template" ref="main">
        <v-card
            light
            class="px-4"
            @dragstart="dragStart"
            @dragend="dragEnd"
            :draggable="!$.edit"
            :style="$.edit ? 'border: 1px solid cyan' : ''"
            :class="$.edit ? 'pt-4 pb-5' : ''">
            <v-row class="px-3 py-1" align="center">
                <v-card :color="coreTemplate.color">&nbsp;</v-card>
                <div class="ml-3">
                    <div>{{ coreTemplate.display(template.props) }}</div>
                    <div class="caption red--text" v-if="validate !== true">{{ validate }}</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="$.edit = !$.edit">
                    <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
                <!-- <v-btn icon @click="copyTemplate(template)">
                    <v-icon>mdi-content-copy</v-icon>
                </v-btn> -->
                <v-btn icon @click="$emit('write', template)">
                    <v-icon>mdi-language-javascript</v-icon>
                </v-btn>
                <v-btn icon @click="$emit('help', template)">
                    <v-icon>mdi-help-circle-outline</v-icon>
                </v-btn>
                <v-btn icon @click="remove">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-row>
            <div v-if="$.edit">
                <v-divider class="mt-3 mb-4"></v-divider>
                <div class="mt-3" v-for="(prop, key, index) in coreTemplate.props" :key="key + 't'">
                    <v-text-field
                        v-if="prop.type === 'text'"
                        v-show="prop.show(template.props)"
                        :label="prop.info"
                        :autofocus="index === 0"
                        hide-details
                        v-model="template.props[key]"
                        outlined
                    ></v-text-field>
                    <div v-if="prop.type === 'javascript'" v-show="prop.show(template.props)">
                        <div class="mb-2">{{ prop.info }}</div>
                        <div style="height: 200px; overflow-y: scroll">
                            <codemirror
                                v-model="template.props[key]"
                                :options="{
                                    mode: 'text/javascript'
                                }"
                            ></codemirror>
                        </div>
                    </div>
                    <div v-if="prop.type === 'radio-group'" v-show="prop.show(template.props)">
                        <div>{{ prop.info }}</div>
                        <v-radio-group v-model="template.props[key]">
                            <v-radio
                                v-for="(item, index) in prop.options"
                                :key="index + 'rg'"
                                :label="item.text"
                                :value="item.value"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                </div>
                <v-btn class="mt-3" block @click="$.edit = false" color="primary" outlined>關閉</v-btn>
            </div>
        </v-card>
        <!-- <div
            v-if="templateDraging"
            class="template-drag-btn"
            @dragenter="dragEnter"
            :class="{ 'template-drag-btn-drag-here': dragHere }">
            拖曳模板至此
        </div> -->
        <!-- <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
                <div v-on="on" class="template-add-btn" @click="$emit('add', step, index)"></div>
            </template>
            <span>加入模板</span>
        </v-tooltip> -->
    </div>
</template>

<script lang="ts">
import core from '@/core'
import * as Step from '@/alas/project/step'
import * as Template from '@/alas/project/template'
import { Self, RefElement } from '@/vue-core'
import { alas, status } from '@/alas'
import { defineComponent, reactive, onMounted, watch, ref, PropType, computed } from '@vue/composition-api'
export default defineComponent({
    props: {
        step: Object as PropType<Step.Model>,
        index: Number,
        template: Object as PropType<Template.Model>
    },
    computed: {
        // ...mapGetters({
        //     keyIn: 'keyIn'
        // }),
        // ...mapGetters({
        //     templateDraging: 'drag/templateDrag',
        //     templateDragTarget: 'drag/templateDragTarget'
        // }),
    },
    setup(props, context) {

        let self = new Self(context)

        // =================
        //
        // refs
        //

        let main: RefElement<HTMLDivElement> = ref(null)

        // =================
        //
        // state
        //

        let $ = reactive({
            edit: false
        })

        // =================
        //
        // computed
        //

        let coreTemplate = computed(() => {
            return core.templates[props.template.name]
        })

        let validate = computed(() => {
            return core.templates[props.template.name].validate(props.template.props)
        })

        // let dragHere = () => {
        //     return props.templateDragTarget ? props.template === props.templateDragTarget.template : false
        // }

        // =================
        //
        // watch
        //

        watch(() => $.edit, () => window.scrollTo(0, main.value.offsetTop - 50))

        // =================
        //
        // mounted
        //

        onMounted(() => {})

        // =================
        //
        // methods
        //

        // ...mapMutations({
        //     copyTemplate: 'copy/copyTemplate'
        // }),
        // ...mapMutations({
        //     dragEndTemplate: 'drag/endTemplate',
        //     dragStartTemplate: 'drag/startTemplate',
        //     dragEnterTemplate: 'drag/enterTemplate'
        // })

        let remove = () => {
            props.step.templates.remove(props.template.id)
        }

        let dragStart = () => {
            // this.dragStartTemplate(props.template)
        }

        let dragEnd = () => {
            // let hasTarget = !!this.templateDragTarget
            // this.dragEndTemplate()
            // if (hasTarget && this.keyIn.includes(18) === false) {
            //     this.remove()
            // }
        }

        let dragEnter = () => {
            // dragEnterTemplate({
            //     step: props.step,
            //     index: props.index,
            //     template: props.template
            // })
        }
        // =================
        //
        // done
        //

        return {
            $,
            main,
            coreTemplate,
            validate,
            remove,
            dragStart,
            dragEnd,
            dragEnter
        }
    }
})
</script>

<style>
    #template .CodeMirror {
        border: 1px solid #000;
        overflow-y: scroll !important;
        height: 200px !important;
    }
    .template-add-btn {
        height: 7px;
        transition: .1s;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
    }
    .template-add-btn:hover {
        background-color: rgba(255, 0, 0, 0.1);
    }
    .template-drag-btn {
        height: 7px;
        transition: .1s;
        padding: 4px 10px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
    }
    .template-drag-btn-drag-here {
        height: 34px;
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>
