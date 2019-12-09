<template>
    <div>
        <div class="play__outer-circle" :class="{ 'play__outer-circle--break': mode === 'break' }" v-if="activeJob">
            <svg width="540px" height="540px" class="inner">
                <circle 
                    class="path" 
                    :stroke="circleColor" 
                    stroke-width="20" 
                    :stroke-dasharray="strokeDasharray" 
                    :stroke-dashoffset="strokeDashoffset"
                    cx="270" 
                    cy="270" 
                    :r="r" 
                    fill="none"/>
                <circle 
                    class="path" 
                    :stroke="circleColor" 
                    stroke-width="2"
                    cx="270" 
                    cy="270" 
                    r="268" 
                    fill="none"/>
            </svg>
            <div class="play__inner-circle" :class="innerCircleClass">
                <div class="play__button-area">
                    <button class="play__play-button" @click="play">
                        <i  class="material-icons play__play-button--icon" 
                            :class="playButtonClass">
                            {{ playButtonIcon }}
                        </i>
                    </button>
                    <button class="play__stop-button" :class="stopButtonClass" @click="reset"></button>
                </div>
            </div>
        </div>
        <div class="message" v-else>
            請先新增任務
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            styleObject: {
                color: '#ff4384'
            },
            r: 258,
            strokeDasharray: 2 * Math.PI * 258,
        }
    },
    methods: {
        play() {
            if (this.isPlaying) {
                this.$store.dispatch('pause');
            } else {
                this.$store.dispatch('start');
            }
            
        },
        reset() {
            if (this.isPlaying) {
                if (confirm('任務正在進行中，確認要停止嗎？')) {
                    this.$store.commit('reset');
                }
            } else {
                this.$store.commit('reset');
            }
        }
    },
    computed: {
        isPlaying() {
            return this.$store.state.isPlaying;
        },
        playButtonIcon() {
            if (this.isPlaying) {
                return 'pause_circle_filled';
            } else {
                return 'play_circle_filled';
            }
        },
        mode() {
            return this.$store.state.mode;
        },
        activeJob() {
            return this.$store.getters.activeJob;
        },
        ////////////// 
        // Class    
        //////////////
        innerCircleClass() {
            return {
                'play__inner-circle--play': this.isPlaying,
                'play__inner-circle--break': this.mode === 'break'
            }
        },
        playButtonClass() {
            return {
                'play__play-button--play': this.isPlaying,
                'play__play-button--break': this.isPlaying && this.mode === 'break'
            }
        },
        stopButtonClass() {
            return {
                'play__stop-button--work': this.isPlaying,
                'play__stop-button--break': this.isPlaying && this.mode === 'break'
            }
        },
        strokeDashoffset() {
            let len = 2 * Math.PI * this.r;
            let percentage;
            if (this.mode === 'work') {
                percentage = this.$store.getters.workPercentage;
            } else if (this.mode === 'break') {
                percentage = this.$store.getters.breakPercentage;
            }
            return len * percentage;
        },
        circleColor() {
            if (this.mode === 'work') {
                return '#FF4384';
            } else{
                return '#00A7FF'
            }
        }
    }
}
</script>

<style lang="scss" scpoed>
    .play__outer-circle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 540px;
        height: 540px;
        border-radius: 50%;
        margin-left: 30px;
        z-index: 10;
    }

    .play__inner-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        height: 500px;
        background-color: $color-red;
        border-radius: 50%;
        border: 2px solid $color-red;

        &--break {
            background-color: $color-lightblue-2;
            border: 2px solid $color-lightblue-2;
        }

        &--play {
            background-color: $color-white;
        }
    }

    .play__button-area {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .play__play-button {
        @include focus-outline-none;

        background-color: transparent;
        border: none;
        border-radius: 50%;

        &--icon {
            color: $color-white;
            font-size: 96px;
            vertical-align: bottom;
        }

        &--play {
            color: $color-red;
        }

        &--break {
            color: $color-lightblue-2;
        }
    }

    .play__stop-button {
        @include focus-outline-none;

        width: 12px;
        height: 12px;
        background-color: white;
        border: none;

        &--work {
            background-color: $color-red;
        }

        &--break {
            background-color: $color-lightblue-2;
        }
    }

    svg {
         transform: rotate(-90deg);
    }

    .message {
        position: absolute;
        top: 45%;
        left: 40%;
        font-size: 60px;
        color: $color-red;
        z-index: 1;
    }

</style>