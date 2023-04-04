<script>
	import { getContext } from "svelte"

	export let fieldName

	const { errors } = getContext("form")

	let messages = []

	$: {
		if ($errors?.[fieldName]) {
			messages = Object.values($errors[fieldName])
				.map(value => value.message)
				.filter(message => message)
		}
	}
</script>

<p class="error-message">{messages[0] ?? ""}</p>

<style>
	.error-message {
		color: var(--color-primary-light-red);

		font-size: var(--font-size-100);
		font-weight: 400;
		font-style: italic;
	}

	@media (min-width: 50rem) {
		.error-message {
			font-size: var(--font-size-200);
		}
	}
</style>
