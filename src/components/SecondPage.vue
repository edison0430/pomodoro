<template>
    <div class="secondPage">
        <div class="section-second-page-left">
            <ul class="nav__list">
                <li class="nav__item" :class="isActive(nav.name)" v-for="nav in navList" :key="nav.name">
                    <a href="#" class="nav__link" :class="{ 'nav__link--break': mode === 'break' }"
                        @click="changeNav(nav.name)">
                        <button type="button" class="nav__button">
                            <i class="material-icons">
                                {{ nav.icon }}
                            </i>
                        </button>
                        <span class="nav__text">
                            {{ nav.name }}
                        </span>
                    </a>
                </li>
            </ul>
            <app-mini-play></app-mini-play>
        </div>
        <div class="section-second-page-right">
            <div v-if="nav === 'to-do list'">
                <app-mission-input></app-mission-input>
                <app-todolist-big></app-todolist-big>
            </div>
            <div v-else-if="nav === 'analytics'">
                <app-analytics></app-analytics>
            </div>
            <div v-else-if="nav === 'ringtones'">
                <app-ringtones></app-ringtones>
            </div>
        </div>
        <app-sidebar isNewPage="Y"></app-sidebar>
    </div>
</template>

<script>
    import Sidebar from './Sidebar.vue';
    import MissionInput from './MissionInput.vue';
    import TodolistBig from './Todolist-Big.vue';
    import Analytics from './Analytics.vue';
    import Ringtones from './Ringtones.vue';
    import MiniPlay from './MiniPlay.vue';


    export default {
        props: ['initNav'],
        data() {
            return {
                navList: [{
                        name: 'to-do list',
                        icon: 'list'
                    },
                    {
                        name: 'analytics',
                        icon: 'insert_chart'
                    },
                    {
                        name: 'ringtones',
                        icon: 'library_music'
                    },
                ],
                nav: this.initNav
            }
        },
        methods: {
            changeNav(nav) {
                this.nav = nav;
            },
            isActive(nav) {
                return {
                    'nav__item--active': this.nav === nav ? true : false,
                    'nav__item--active-break': this.mode === 'break' && this.nav === nav ? true : false,
                }
            }
        },
        computed: {
            isPlaying() {
                return this.$store.getters.isPlaying;
            },
            mode() {
                return this.$store.getters.mode;
            }
        },
        components: {
            appSidebar: Sidebar,
            appMissionInput: MissionInput,
            appTodolistBig: TodolistBig,
            appAnalytics: Analytics,
            appRingtones: Ringtones,
            appMiniPlay: MiniPlay
        }
    }
</script>

<style lang="scss" scpoed>
    .secondPage {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: $color-blue;
        z-index: 200;
        display: flex;
    }

    .section-second-page-left {
        margin: 50px 40px 0px 85px;
        position: relative;
    }

    .nav {
        &__list {
            list-style-type: none;
        }

        &__item {
            margin-bottom: 40px;

            &--active .nav__button,
            &--active .nav__text {
                color: $color-red;
            }

            &--active-break .nav__button,
            &--active-break .nav__text {
                color: $color-lightblue-2;
            }
        }

        &__button {
            @include focus-outline-none;

            background-color: transparent;
            border: none;
            vertical-align: bottom;
            color: $color-grey;
            margin-right: 10px;

            & i {
                font-size: 36px;
            }
        }

        &__link {
            text-decoration: none;

            &:hover>* {
                color: $color-red;
            }
        }

        &__link--break:hover>* {
            color: $color-lightblue-2;
        }

        &__text {
            color: $color-grey;
            font-size: 36px;
            font-weight: bold;
            text-transform: uppercase;
        }
    }

    .section-second-page-right {
        margin: 50px 300px;
        display: flex;
        flex-direction: column;
    }
</style>