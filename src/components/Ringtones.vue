<template>
    <div class="section-ringtones">
        <div class="ringtone">
            <div class="header">
                <span class="header__title">work</span>
            </div>
            <div class="ringtone__list">
                <template v-for="(ring, index) in ringList">
                    <input type="radio" name="break" :key="ring" :id="ring" :value="ring">
                    <label :for="ring" class="ringtone__item" @click="change(ring, 'work')" :key="index">
                        <i class="material-icons icons-active" :class="{ 'icons-break': mode === 'break'}"
                            v-if="workRingtone === ring">
                            radio_button_checked
                        </i>
                        <i class="material-icons" v-else>
                            radio_button_unchecked
                        </i>
                        {{ ring }}
                    </label>
                </template>
            </div>
        </div>

        <div class="ringtone">
            <div class="header">
                <span class="header__title">break</span>
            </div>
            <div class="ringtone__list">
                <template v-for="(ring, index) in ringList">
                    <input type="radio" name="break" :key="ring" :id="ring" :value="ring">
                    <label :for="ring" class="ringtone__item" @click="change(ring, 'break')" :key="index">
                        <i class="material-icons icons-active" :class="{ 'icons-break': mode === 'break'}"
                            v-if="breakRingtone === ring">
                            radio_button_checked
                        </i>
                        <i class="material-icons" v-else>
                            radio_button_unchecked
                        </i>
                        {{ ring }}
                    </label>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ringList: ['none', 'default', 'beep', 'victory', 'jojo']
            }
        },
        methods: {
            change(ring, type) {
                this.$store.commit('changeRing', {
                    type,
                    ring
                });
            }
        },
        computed: {
            workRingtone() {
                return this.$store.state.workRingtone;
            },
            breakRingtone() {
                return this.$store.state.breakRingtone;
            },
            mode() {
                return this.$store.state.mode;
            }
        }
    }
</script>


<style lang="scss" scoped>
    .ringtone {
        margin-bottom: 30px;

        &__list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }

        &__item {
            color: $color-white;
            flex: 0 0 33%;
            text-transform: uppercase;
            margin-top: 10px;
            font-weight: bold;
            display: flex;
            cursor: pointer;

            & i {
                margin-right: 5px;
            }
        }
    }

    input[type="radio"] {
        display: none;
    }

    .icons-active {
        color: $color-red;
    }

    .icons-break {
        color: $color-lightblue-2;
    }
</style>