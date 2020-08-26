<template>
    <v-app-bar app color="primary" dark class="px-2" height="56px">
        <v-btn v-if="back" icon @click="$router.push(back)" small>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <slot></slot>
    </v-app-bar>
</template>

<script>
export default {
    props: ['title', 'back']
}
</script>