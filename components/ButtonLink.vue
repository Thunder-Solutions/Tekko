<template>
	<div class="button-container" v-editable="blok">
		<storyblok-link :class="buttonClass" :link="blok.link">
			{{ blok.text }}
		</storyblok-link>
	</div>
</template>

<style scoped>
a.basic,
a.basic:visited,
a.basic:active,
a.basic:hover {
	display: inline-flex;
	place-items: center;
	place-content: center;
	text-decoration: none;
	background-color: var(--color-primary-base);
	color: var(--color-primary-contrast-base);
	border: none;
	padding: var(--size-2) var(--size-4);
	border-radius: var(--border-radius);
	cursor: pointer;
	box-shadow: 0 0 var(--size-1) var(--color-primary-base);
	font-weight: bold;
	transition: filter 0.3s ease;
}
a.basic:hover {
	filter: brightness(2);
}
a.primary,
a.primary:visited,
a.primary:active,
a.primary:hover {
	font-family: 'Orbitron';
	display: inline-block;
	background-color: var(--color-primary-focus);
	color: var(--color-primary-contrast-base);
	padding: var(--size-2) var(--size-4);
	box-shadow: 4px 4px 0 var(--color-primary-accent);
	text-decoration: none;
	letter-spacing: 0.1em;
	transition: filter 0.3s;
}
a.primary:hover {
	filter: brightness(1.5);
}

.button-container {
	margin: var(--size-4);
	display: flex;
	place-content: center;
	place-items: center;
}
</style>

<script>
export default {
	props: ['blok'],
	computed: {
		buttonClass() {
			return this.blok.variant ?? 'basic'
		},
	},
}
</script>