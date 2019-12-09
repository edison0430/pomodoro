<template>
  <div class="sidebar">
      <div class="sidebar__button-area" v-if="!isNewPage">
          <button class="sidebar__button" @click="changeComponent('to-do list')">
            <i class="material-icons">
                list
            </i> 
        </button>
        <button class="sidebar__button">
            <i class="material-icons" @click="changeComponent('analytics')">
                insert_chart
            </i> 
        </button>
        <button class="sidebar__button">
            <i class="material-icons" @click="changeComponent('ringtones')">
                library_music
            </i> 
        </button>
        <button class="sidebar__button">
            <i class="material-icons" :class="{ 'active': debugMode }" @click="debugToggle()">
                bug_report
            </i> 
        </button>
      </div>
      <div class="sidebar__close" v-else>
        <button @click="close" class="sidebar__button">
            <i class="material-icons">
                clear
            </i>
        </button>
      </div>
      <p class="sidebar__title">pomodoro</p>
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
    props: ['isNewPage'],
    data () {
        return {

        }
    },
    methods: {
        changeComponent(component) {
            this.$emit('changeComponentFromChild', component);
        },
        close() {
            eventBus.$emit('closeSecondPage');
        },
        debugToggle() {
            this.$store.commit('debugToggle');
        }
    },
    computed: {
        debugMode() {
            return this.$store.state.debugMode;
        }
    }

}
</script>

<style lang="scss" scoped>
    .sidebar {
        position: absolute;
        right: 85px;
        top: 50px;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__button-area {
            display: flex;
            flex-direction: column;
            margin-bottom: auto;
        }

        &__close {
            margin-bottom: auto;
        }

        &__button {
            @include focus-outline-none;

            background-color: transparent;
            border: none;
            color: $color-white;
            transition: all .2s;
            outline: none;

            &:hover {
                transform: scale(1.2);
            }

            &:not(:last-child) {
                margin-bottom: 50px;
            }

            &:last-of-type {
                margin-bottom: auto;
            }

            & i {
                font-size: 36px;
            }
        }

        &__title {
            writing-mode: vertical-rl;
            text-transform: uppercase;
            color: $color-white;
            font-weight: bold;
            font-size: 24px;
        }
    }

    .active {
        color: $color-red;
    }
</style>