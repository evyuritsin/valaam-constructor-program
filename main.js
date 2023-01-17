const { createApp } = Vue

const main = Vue.createApp({
	template: /*html*/ `
		<App />
	`,
	components: {
		App,
	},
})

main.use(store)
main.mount('#app')
