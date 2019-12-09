import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        activeID: '92d04541-cfef-493c-b209-21a13ff7f831',
        todos: [
            {
                name: '洗衣服',
                done: false,
                id: '92d04541-cfef-493c-b209-21a13ff7f831',
                doneRecords: ['2019-11-20', '2019-11-25', '2019-11-28', '2019-12-02', '2019-12-07']
            },
            {
                name: '溜貓',
                done: false,
                id: '34e95e4c-957f-47c3-b882-abc303adf527',
                doneRecords: ['2019-11-20', '2019-11-25', '2019-12-07']
            }, {
                name: '澆花',
                done: true,
                id: '43a617b8-72cf-494f-bab0-5a6b7069de2e',
                doneRecords: ['2019-11-21', '2019-11-25', '2019-12-03', '2019-12-07', '2019-12-08']
            }, {
                name: '慢跑',
                done: false,
                id: '44136bc4-9ab4-4fb0-862e-689ba2f2d44b',
                doneRecords: ['2019-11-22', '2019-11-26', '2019-11-29', '2019-12-05']
            }, {
                name: '掃地',
                done: false,
                id: '78c943fa-d8af-45f3-bb5c-5f774a50eccc',
                doneRecords: ['2019-11-23', '2019-11-24', '2019-11-27', '2019-12-05']
            }, {
                name: '背單字',
                done: true,
                id: 'c33e4879-a9e7-48a0-95f3-0e86800276db',
                doneRecords: ['2019-11-20', '2019-11-23', '2019-11-28', '2019-12-01', '2019-12-09']
            },
        ],
        isPlaying: false,
        workTimeout: 25 * 60,
        breakTimeout: 10,
        intervalID: null,
        defaultWorkTimeout: 25 * 60,
        defaultBreakTimeout: 5 * 60,
        mode: 'work',
        workRingtone: 'default',
        breakRingtone: 'beep',
        debugMode: false,
    },
    getters: {
        todolist: state => {
            return state.todos.filter(todo => !todo.done);
        },
        donelist: state => {
            return state.todos.filter(todo => todo.done);
        },
        activeJob: state => {
            if (state.activeID) {
                return state.todos.find(element => element.id === state.activeID);
            } else {
                return null;
            }
        },
        countdown: state => {
            let mins, secs;
            mins = Math.floor(state.workTimeout / 60);
            secs = state.workTimeout % 60;
            if (mins < 10) {
                mins = '0' + mins; 
            }
            if (secs < 10) {
                secs = '0' + secs;
            }
            
            return `${mins}:${secs}`
        },
        workPercentage: state => state.workTimeout / state.defaultWorkTimeout,
        breakPercentage: state => state.workTimeout / state.defaultBreakTimeout,
    },
    actions: {
        start: ({ commit, state }) => {
            state.intervalID = setInterval(() => {
                state.workTimeout--;
            }, 1000)

            commit('start');
        },
        pause: ({ commit }) => {
            commit('pause');
        },
        stop: ({ commit }) => {
            commit('stop');
        }
    },
    mutations: {
        addTodo (state, payload) {
            state.todos.push(payload);
            
            if (!state.activeID) {
                state.activeID = payload.id;
            }
        },
        deleteTodo (state, payload) {
            // console.log(payload);
            let index = state.todos.findIndex(element => element.id == payload);
            state.todos[index].done = true;
            
            // 若要刪除的 JOB 為目前執行中的 JOB，應將 activeJob 同時變更
            if (payload === state.activeID) {
                let nextTodo = state.todos.find(element => element.done === false);
                if (nextTodo) {
                    state.activeID = nextTodo.id;
                } else {
                    state.activeID = null;
                }
            }
        },
        changeActiveJob (state, payload) {
            state.activeID = payload;
        },
        start (state) {
            state.isPlaying = true;
        },
        pause (state) {
            state.isPlaying = false;
            clearInterval(state.intervalID)
        },
        stop (state) {
            state.isPlaying = false;
            clearInterval(state.intervalID);
            // change mode
            if (state.mode === 'work') {
                state.workTimeout = state.defaultBreakTimeout;
                state.mode = 'break';
            } else {
                state.workTimeout = state.defaultWorkTimeout;
                state.mode = 'work';
            }
        },
        reset (state) {
            state.isPlaying = false;
            state.workTimeout = state.defaultWorkTimeout;
            state.mode = 'work';
            clearInterval(state.intervalID);
        },
        addDoneRecord (state) {
            state
                .todos.find(element => element.id === state.activeID)
                .doneRecords.push(new Date().toLocaleDateString());
        },
        changeRing (state, payload) {
            if (payload.type === 'work') {
                state.workRingtone = payload.ring;
            } else if (payload.type === 'break') {
                state.breakRingtone = payload.ring;
            }
        },
        debugToggle (state) {
            state.debugMode = !state.debugMode;
            if (state.debugMode) {
                state.workTimeout = 5;
                state.defaultWorkTimeout = 5;
                state.defaultBreakTimeout = 5;
            } else {
                state.workTimeout = 25 * 60;
                state.defaultWorkTimeout = 25 * 60;
                state.defaultBreakTimeout = 5 * 60;
            }
        }
    }
});