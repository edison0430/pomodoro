<template>
    <div id="app">
        <el-row>
            <el-col :span="16" class="bg-left">
                <div class="section-todolist">
                    <app-mission-input></app-mission-input>
                    <app-todolist @changeComponentFromChild="changeComponet"></app-todolist>
                </div>
                <div class="section-play">
                    <app-play></app-play>
                </div>
            </el-col>
            <el-col :span="8" class="bg-right">
                <app-sidebar @changeComponentFromChild="changeComponet"></app-sidebar>
            </el-col>
        </el-row>
        <transition name="slide">
            <component :is="page" :initNav="pageMode"/>
        </transition>
    </div>

</template>

<script>
    import MissionInput from './components/MissionInput.vue';
    import Todolist from './components/Todolist.vue';
    import Play from './components/Play.vue';
    import Sidebar from './components/Sidebar.vue';
    import SecondPage from './components/SecondPage.vue';

    import {
        eventBus
    } from './main.js';


    export default {
        name: 'app',
        data() {
            return {
                page: "",
                pageMode: ""
            }
        },
        methods: {
            changeComponet(pageMode) {
                this.page = "appSecondPage";
                this.pageMode = pageMode; 

            }
        },
        computed: {
            isplaying() {
                return this.$store.getters.isplaying;
            },
            mode() {
                return this.$store.getters.mode;
            }
        },
        created() {
            eventBus.$on('closeSecondPage', () => this.page = "")
        },
        components: {
            appMissionInput: MissionInput,
            appTodolist: Todolist,
            appPlay: Play,
            appSidebar: Sidebar,
            appSecondPage: SecondPage
        }
    }
</script>

<style lang="scss" scoped>
    .section-todolist {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        *:first-child {
            margin-bottom: 150px;

            @media (max-width: 1440px) {
                margin-bottom: 100px;
            }
        }
    }

    .section-play {
        position: absolute;
        right: 30%;
        top: 50%;
    }
</style>