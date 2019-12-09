<template>
    <div class="mission__wrapper">
        <input  type="text" 
                placeholder="Add a new Mission..." 
                class="mission__input" 
                :class="{ 'mission__input--break': mode === 'break' }"
                v-model="mission"
                @keydown.enter="addTodo">
        <button type="button" class="mission__btn" :class="{ 'mission__btn--break': mode === 'break' }" @click="addTodo">
            <i class="material-icons">
                add
            </i>    
        </button>    
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            mission: ''
        }
    },
    methods: {
        addTodo() {
            if (this.mission) {
                const newItem = {
                    name: this.mission,
                    done: false,
                    id: this._uuid(),
                    doneRecords: []
                }
                this.$store.commit('addTodo', newItem);
                this.mission = '';
            }
        },
        _uuid() {
            var d = Date.now();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }
    },
    computed: {
        mode() {
            return this.$store.state.mode;
        }
    }
}
</script>

<style lang="scss" scpoed>

    .mission__wrapper {
        display: flex;
        margin-bottom: 30px;
    }

    .mission__input {
        @include focus-outline-none;

        height: 55px;
        width: 400px; 
        font-weight: bold;
        font-size: 16px;
        padding: 20px 15px;
        border: none;
        color: $color-red;

        &--break {
            color: $color-lightblue-2;
            
            &::placeholder {
                color: $color-lightblue-2;
            }
        }
    }

    
    .mission__btn {
        @include focus-outline-none;

        width: 40px;
        padding: 0px;
        border: none;
        color: $color-red;
        background-color: $color-white;

        &--break {
            color: $color-lightblue-2;
        }
        
        & i {
            transform: translateY(2px);
        }
        
    }

    ::placeholder {
        text-transform: uppercase;
        font-style: italic;
        font-weight: bold;
        color: $color-red;
    }
</style>