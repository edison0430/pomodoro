<template>
    <div class="section-analytics">
        <div class="focus-time">
            <div class="header">
                <span class="header__title">Focus time</span>
            </div>
            <div class="focus-time__content">
                <div class="focus-time__today">
                    <span class="focus-time__today--header">
                        TODAY
                    </span>
                    <div class="focus-time__today--record">
                        <span class="focus-time__today--count" :class="{ 'focus-time__today--count-break' : mode === 'break' }">
                            {{ todayTomato }}
                        </span>
                        /TOMATO
                    </div>
                </div>
                <div class="focus-time__today">
                    <span class="focus-time__today--header">
                        WEEK
                    </span>
                    <div class="focus-time__today--record">
                        <span class="focus-time__today--count" :class="{ 'focus-time__today--count-break' : mode === 'break' }">
                            {{ weekTomato }}
                        </span>
                        /TOMATO
                    </div>
                </div>
            </div>
        </div>

        <div class="chart">
            <div class="header">
                <span class="header__title">Chart</span>
                <button class="header__title--button" @click="weekOfYear--">
                    <i class="material-icons">
                        keyboard_arrow_left
                    </i>
                </button>
                <span class="header__title--date">
                        {{ weekString }}
                </span>
                <button class="header__title--button" @click="weekOfYear++">
                    <i class="material-icons">
                        keyboard_arrow_right
                    </i>
                </button>
            </div>

            <div class="chart__content">
                <ve-histogram 
                    :data="chartData" 
                    :extend="extend" 
                    :settings="chartSettings"
                    :legend-visible="false" 
                    background-color="#003164" 
                ></ve-histogram>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            this.chartSettings = {
                labelMap: {
                    'doneCount': '完成數量',
                }
            },
            this.extend = {
                series: {
                    barWidth: '30',
                    itemStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    axisLabel: {
                        color: '#fff',
                        formatter: value => value.slice(5)
                    },
                    
                },
                yAxis: {
                    max: 8,
                    minInterval: 2,
                    axisLabel: {
                        color: '#fff',
                    },
                    axisLine: {
                        // show: true,
                        onZero: false,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }
            }
            return {
                weekOfYear: moment().week(),
            }
        },
        computed: {
            chartData() {
                const result = { columns: ['date', 'doneCount'], rows: [] };
                for(let i = 0; i < 7; i++) {
                    let weekString = moment().week(this.weekOfYear).day(i).format('YYYY/MM/DD');
                    result.rows.push({ 'date': weekString, 'doneCount': 0 });
                }

                this.todolist.forEach(todo => {
                    todo.doneRecords.forEach(record => {
                        let recordDate = moment(record);
                        let firstDayInWeek = moment().week(this.weekOfYear).day(0);
                        let lastDayInWeek = moment().week(this.weekOfYear).day(6)
                        if (recordDate.isBetween(firstDayInWeek, lastDayInWeek, 'day', '[]')) {
                            result.rows.forEach(row => {
                                if (row.date === recordDate.format('YYYY/MM/DD')) {
                                    row.doneCount++;
                                }
                            })
                        }
                    })
                })

                return result;
            },
            mode() {
                return this.$store.state.mode;
            },
            todolist() {
                return this.$store.state.todos;
            },
            todayTomato() {
                let result = 0;
                this.todolist.forEach(todo => {
                    todo.doneRecords.forEach(record => {
                        if (record === new Date().toLocaleDateString()) {
                            result++;
                        }
                    })
                });
                return result;
            },
            weekTomato() {
                let result = 0;

                this.todolist.forEach(todo => {
                    todo.doneRecords.forEach(record => {
                        let recordDate = moment(record);
                        let firstDayInWeek = moment().week(this.weekOfYear).day(0);
                        let lastDayInWeek = moment().week(this.weekOfYear).day(6)
                        if (recordDate.isBetween(firstDayInWeek, lastDayInWeek, 'day', '[]')) {
                            result++;
                        }
                    })
                })
                return result;
            },
            weekString() {
                return `${moment().week(this.weekOfYear).day(0).format('YYYY.MM.DD')} - ${moment().week(this.weekOfYear).day(6).format('YYYY.MM.DD')}`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .focus-time {
        margin-bottom: 30px;

        &__content {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
        }

        &__today--header {
            color: $color-white;
            font-weight: bold;
            text-transform: uppercase;

        }

        &__today--record {
            color: $color-grey;
            display: flex;
            align-items: baseline;
        }

        &__today--count {
            color: $color-red;
            font-size: 64px;
            font-weight: bold;
            margin-right: 10px;

            &-break {
                color: $color-lightblue-2;
            }
        }
    }
</style>