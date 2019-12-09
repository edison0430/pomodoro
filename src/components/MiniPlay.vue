<template>
    <div class="mini-play">
        <button class="mini-play__play" :class="{ 'mini-play__play--break': mode === 'break' }" @click="play" v-if="activeJob">
            <i class="material-icons">
                {{ icon }}
            </i>
        </button>
        <span class="mini-play__countdown" :class="{ 'mini-play__countdown--break': mode === 'break' }" v-if="activeJob">
            {{ countdown }}
        </span>
        <span class="mini-play__playing-job">
            <span v-if="activeJob">{{ activeJob.name }}</span>
            <span v-else>NOTHING TO DO</span>
        </span>
    </div>
</template>

<script>
    export default {
        methods: {
            play() {
                if (this.isPlaying) {
                    this.$store.dispatch('pause');
                } else {
                    this.$store.dispatch('start');
                }
            }
        },
        computed: {
            isPlaying() {
                return this.$store.state.isPlaying;
            },
            activeJob() {
                return this.$store.getters.activeJob;
            },
            countdown() {
                return this.$store.getters.countdown;
            },
            icon() {
                if (this.isPlaying) {
                    return 'pause';
                } else {
                    return 'play_arrow';
                }
            },
            mode() {
                return this.$store.state.mode;
            }
        }

    }
</script>

<style lang="scss" scoped>
    .mini-play {
        position: absolute;
        bottom: -175px;
        left: 0;
        height: 350px;
        width: 350px;
        border-radius: 50%;
        background: #FFEDF7 0% 0% no-repeat padding-box;

        &__play {
            @include focus-outline-none;

            position: absolute;
            left: 50%;
            top: -10%;
            transform: translateX(-50%);
            border: 6px solid $color-blue;
            border-radius: 50%;
            width: 96px;
            height: 96px;
            background-color: $color-red;
            box-shadow: 0 0 0 2px $color-red, 0 0 0 7px $color-blue;
            transition: border .3s;

            & i {
                color: white;
                font-size: 48px;
                vertical-align: bottom;
            }

            &:hover {
                border: 0 solid $color-red;
            }

            &--break {
                background-color: $color-lightblue-2;
                box-shadow: 0 0 0 2px $color-lightblue-2, 0 0 0 7px $color-blue;

                &:hover {
                    border: 0 solid $color-lightblue-2;
                }
            }
        }

        &__countdown {
            position: absolute;
            left: 50%;
            top: 18%;
            transform: translateX(-50%);
            font-size: 48px;
            font-weight: bold;
            color: $color-red;

            &--break {
                color: $color-lightblue-2;
            }
        }

        &__playing-job {
            position: absolute;
            left: 50%;
            top: 37%;
            transform: translateX(-50%);
            font-weight: bold;
            color: $color-blue;
            width: inherit;
            text-align: center;

        }
    }
</style>