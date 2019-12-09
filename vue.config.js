module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/_variables.scss";
                    @import "@/styles/_base.scss";
                    @import "@/styles/_mixin.scss";
                    @import "@/styles/_transition.scss";
                `
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/pomodoro/' : '/'
}