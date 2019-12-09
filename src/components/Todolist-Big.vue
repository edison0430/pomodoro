<template>
    <div class="todolist__big">
        <div class="header">
            <span class="header__title">To-do</span>
            <button class="header__collapse-btn"  @click="showTodolist = !showTodolist">
                <i class="material-icons" v-if="showTodolist">
                    arrow_drop_up
                </i>
                <i class="material-icons" v-else>
                    arrow_drop_down
                </i>
            </button>
        </div>
        <transition name="fade">
            <ul class="todolist__list" v-if="showTodolist">
                <li class="todolist__item" v-for="item in todolist" :key="item.id">
                    <button class="todolist__btn--done" 
                        @mouseover="item.icon = 'check_circle_outline'" 
                        @mouseleave="item.icon = 'radio_button_unchecked'"
                        @click="deleteTodo(item.id)">
                        <i class="material-icons">
                            {{ item.icon }}
                        </i>
                    </button>
                    {{ item.name }}
                    <button class="todolist__btn--play" @click="changeActiveJob(item.id)">
                        <i class="material-icons" >
                            play_circle_outline
                        </i>
                    </button>
                </li>
            </ul>
        </transition>
        
        <div class="header">
            <span class="header__title">done</span>    
            <button class="header__collapse-btn" @click="showDonelist = !showDonelist">
                <i class="material-icons" v-if="showDonelist">
                    arrow_drop_up
                </i>
                <i class="material-icons" v-else>
                    arrow_drop_down
                </i>
            </button>
        </div>
        <transition name="fade">
            <ul class="todolist__list" v-if="showDonelist">
                <li class="todolist__item" v-for="item in donelist" :key="item.id">
                    <i class="material-icons" >
                        check_circle_outline
                    </i>
                    <span class="todolist__item--name">
                        {{ item.name }}
                    </span>
                    <span class="todolist__dot" v-for="(dot, index) in item.doneRecords" :key="index"></span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showTodolist: true,
            showDonelist: true
        }
    },
    methods: {
        changeActiveJob(id) {
            if (id === this.$store.state.activeID) {
                return;
            }

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
        deleteTodo(id) {
            if (id === this.$store.state.activeID) {
                this.$store.commit('reset');
            }
            this.$store.commit('deleteTodo', id);
        }
    },
    computed: {
        todolist() {
            return this.$store.getters.todolist;
        },
        donelist() {
            return this.$store.getters.donelist;
        },
        mode() {
            return this.$store.state.mode;
        }
    },
    watch: {
        todolist(newTodolist, oldTodolist) {
            // 新增 todo 時，初始化其 icon 屬性
            if (newTodolist.length > oldTodolist.length) {
                this.$set(newTodolist[newTodolist.length - 1], 'icon', 'radio_button_unchecked');
            }
        }
    },
    created() {
        this.todolist.forEach(element => {
            this.$set(element, 'icon', 'radio_button_unchecked');
        });
    }

}
</script>

<style lang="scss" scoped>

.todolist {

    &__list {
        list-style-type: none;
        max-height: 300px;
        overflow-y: auto;
        margin-bottom: 30px;
    }

    &__item {
        color: $color-white;
        padding: 10px 0;
        font-weight: bold;
        border-bottom: 1px solid $color-grey;
        position: relative;
        display: flex;
        // justify-content: space-between;
        align-items: center;

        &--name {
            margin-left: 8px;
            margin-right: auto;
            text-decoration: line-through;
        }
    }

    &__dot {
        width: 12px;
        height: 12px;
        background-color: $color-white;
        border-radius: 50%;
        margin-right: 7px;
    }

    &__btn--done {
        @include focus-outline-none;
        border: none;
        background-color: transparent;
        color: $color-white;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        
        & i {
            vertical-align: bottom;
        }
    }

    &__btn--play {
        @include focus-outline-none;
        margin-left: auto;
        border: none;
        background-color: transparent;
        color: $color-white;
       
       & i {
            vertical-align: bottom;
        }
    }
}
</style>