<script>
	import { getContext } from "svelte"

	export let type = "text"
	export let label = ""
	export let name
	export let autocomplete = "off"
	export let maxlength = ""

	const { errors } = getContext("form")

	let isError = ""

	$: {
		if ($errors?.[name] || $errors.shared) {
			isError =
				Object.keys($errors[name]).some(errorKey => $errors[name][errorKey].error) ||
				Object.keys($errors.shared).some(errorKey => $errors.shared[errorKey].error)
					? "error"
					: ""
		}
	}
</script>

<label for={name} class={isError}>{label}</label>
<input {type} {name} id={name} class={isError} {autocomplete} {maxlength} />

<style>
	input {
		width: 100%;
		height: 3.5rem;
		padding-inline: 1rem;
		border-radius: 0.5rem;

		background-color: white;
		border: 1px solid var(--color-neutral-400);

		font-size: var(--font-size-300);

		transition: all 100ms ease-in;
	}

	input::placeholder {
		color: var(--color-neutral-600);
	}

	label {
		font-size: var(--font-size-100);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-neutral-600);
	}

	input:hover,
	input:focus,
	input:active {
		outline: none;
		border-color: var(--color-primary-purple);
	}

	input.error {
		border-color: var(--color-primary-light-red);
	}

	label.error {
		color: var(--color-primary-light-red);
	}

	@media (min-width: 50rem) {
		input {
			height: 4.5rem;
			padding-inline: 1.5rem;

			font-size: var(--font-size-300);
		}

		label {
			font-size: var(--font-size-200);
		}
	}
</style>
