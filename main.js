const main = Vue.createApp({
	template: /*html*/ `
		<App />
	`,
	components: {
		App,
	},
}).directive('mask', VueMask.VueMaskDirective)

main.use(store)
main.mount('#app')
