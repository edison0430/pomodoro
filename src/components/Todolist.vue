<template>
    <div class="todolist" v-if="activeJob">
        <h2 class="todolist__active">
            {{ activeJob.name }}
            <div class="todolist__pomodoro">
                <span class="todolist__dot" v-for="(dot, index) in activeJob.doneRecords" :key="index"></span>
            </div>
        </h2>
        <div class="todolist__countdown" :class="{ 'todolist__countdown--break': mode === 'break' }">
            {{ countdown }}
        </div>
        <ul class="todolist__list">
            <li class="todolist__item" v-for="item in todolist.slice(0, 4)" v-show="item.id !== activeID" :key="item.id">
                <span class="todolist__item--title">
                    {{ item.name }}
                </span>
                <button class="todolist__change-btn" @click="changeActiveJob(item.id)">
                    <i class="material-icons">
                        play_circle_outline
                    </i>   
                </button>
            </li>
        </ul>
        <a  href="#" 
            class="todolist__link"
            :class="{ 'todolist__link--break': mode === 'break' }"
            @click.prevent="$emit('changeComponentFromChild', 'to-do list')"
            :style="{ visibility: todolist.length > 4 ? 'visible' : 'hidden' }">
            <!-- v-if="todolist.length > 4" -->
            More
        </a>
        <audio ref="audio"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        openList() {
            this.$emit('newEvent', 'list');
        },
        changeActiveJob(id) {
            if (this.mode === 'work' && this.$store.state.workTimeout !== this.$store.state.defaultWorkTimeout) {
                if (confirm('任務正在進行中，確認要停止嗎？')) {
                    this.$store.commit('reset');
                    this.$store.commit('changeActiveJob', id);
                }  
            } else {
                this.$store.commit('reset');
                this.$store.commit('changeActiveJob', id);
            }
        },
        playAudio() {
            this.$refs.audio.play();
        }
    },
    computed: {
        todolist() {
            return this.$store.getters.todolist;
        },
        activeJob() {
            return this.$store.getters.activeJob;
        },
        activeID() {
            return this.$store.state.activeID;
        },
        countdown() {
            return this.$store.getters.countdown;
        },
        mode() {
            return this.$store.state.mode;
        }
    },
    watch: {
        countdown(value) {
            if (value === '00:00') {
                let src = null;
                if (this.mode === 'work') {
                    src = `/${this.$store.state.workRingtone}.mp3`;
                    this.$store.commit('addDoneRecord');
                } else {
                    src = `/${this.$store.state.breakRingtone}.mp3`;
                }
                this.$refs.audio.src = src;
                this.playAudio();

                this.$store.dispatch('stop');
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.todolist {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &__active {
        font-size: 24px;
        color: $color-blue;
        font-weight: bold;
        padding-left: 70px;
        margin-bottom: 50px;
        position: relative;
        display: flex;
        flex-direction: column;

        &::before {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            height: 48px;
            width: 48px;
            border: 2px solid $color-blue;
            border-radius: 50%;
        }
    }

    &__pomodoro {
        display: flex;
    }

    &__dot {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background-color: $color-blue;
        margin-top: 4px;
        margin-right: 5px;
    }

    &__countdown {
        font-size: 176px;
        font-weight: bold;
        color: $color-red;
        margin-bottom: auto;
        transform: translateY(-20px);

        &--break {
            color: $color-lightblue-2;
        }
    }

    &__list {
        list-style-type: none;
    }

    &__item {
        padding: 10px 0px 5px 30px; 
        border-bottom: 1px solid rgba($color-blue, .2);
        position: relative;
        display: flex;
        justify-content: space-between;

        &--title {
            font-weight: bold;
            color: $color-blue;
        }

        &::before {
            content: "";
            position: absolute;
            top: 10px;
            left: 0px;
            height: 24px;
            width: 24px;
            border: 2px solid $color-blue;
            border-radius: 50%;
        }
    }

    &__change-btn {
        @include focus-outline-none;

        border: none;
        background-color: transparent;
        transition: all .3s;

        &:hover {
            transform: scale(1.1);
        }
    }

    &__link {
        color: $color-red;
        align-self: flex-end;
        margin-top: 5px;
        text-decoration: none;
        font-weight: bold;

        &--break {
            color: $color-lightblue-2;
        }
    }
}

</style>