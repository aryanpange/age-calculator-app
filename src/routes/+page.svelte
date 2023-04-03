<script>
	import iconArrow from "$lib/images/icon-arrow.svg"

	import { calculateAge } from "../lib/CalculateAge"
	import { Validators } from "../lib/Validators"

	import Form from "../lib/Form.svelte"
	import Input from "../lib/Input.svelte"
	import Error from "../lib/Error.svelte"

	let userDay = ""
	let userMonth = ""
	let userYear = ""

	$: birthDate = {
		day: Number(userDay),
		month: Number(userMonth),
		year: Number(userYear),
	}

	const currentDate = () => {
		const today = new Date()

		return {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear(),
		}
	}

	const daysInMonths = year => {
		let february = year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0) ? 28 : 29
		return [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	}

	// Form validation

	let formElement

	let isFormValid = true

	let results = {}

	$: form = {
		day: {
			validators: [
				Validators.required,
				Validators.isValidDay,
				Validators.isValidDate(daysInMonths(birthDate.year)[birthDate.month] - 1),
			],
		},

		month: {
			validators: [Validators.required, Validators.isValidMonth],
		},

		year: {
			validators: [Validators.required, Validators.isInThePast(currentDate().year)],
		},
	}

	const onSubmit = e => {
		if (e?.detail?.valid) {
			isFormValid = true
			results = calculateAge(currentDate(), e.detail.data, daysInMonths)
			console.log(results)
		} else {
			isFormValid = false
			results = {}
			console.log("Invalid form")
		}
	}
</script>

<main class="card">
	<Form {form} on:submit={onSubmit} bind:this={formElement}>
		<div class="input-wrapper">
			<Input label="day" name="day" maxlength="2" {isFormValid} />
			<Error fieldName="day" />
		</div>

		<div class="input-wrapper">
			<Input label="month" name="month" maxlength="2" {isFormValid} />
			<Error fieldName="month" />
		</div>

		<div class="input-wrapper">
			<Input label="year" name="year" maxlength="4" {isFormValid} />
			<Error fieldName="year" />
		</div>

		<button class="button button--submit" type="submit" aria-label="submit">
			<img src={iconArrow} alt="" />
		</button>
	</Form>

	<div class="results-wrapper">
		<div class="results">
			<span class="results__value">{results.year ?? "--"}</span>
			<span class="results__label">years</span>
		</div>

		<div class="results">
			<span class="results__value">{results.month ?? "--"}</span>
			<span class="results__label">months</span>
		</div>

		<div class="results">
			<span class="results__value">{results.day ?? "--"}</span>
			<span class="results__label">days</span>
		</div>
	</div>
</main>

<style>
	.card {
		justify-self: center;
		align-self: baseline;

		max-width: 52.5rem;

		padding: 3rem 1.5rem;

		display: grid;
		justify-items: center;
		row-gap: 4rem;

		border-radius: 1.5rem 1.5rem 6.25rem 1.5rem;

		background-color: var(--color-neutral-100);
	}

	.button {
		display: flex;
		justify-content: center;
		align-items: center;

		background-color: var(--color-primary-purple);

		transition: all 100ms ease-in;
	}

	.button--submit {
		width: 4rem;
		height: 4rem;
		border: none;
		border-radius: 50%;
		padding: 1rem;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(50%);
	}

	.results-wrapper {
		width: 100%;

		font-size: clamp(var(--font-size-600), 15vw, var(--font-size-900));
		font-weight: 800;
		font-style: italic;
		letter-spacing: -2px;
	}

	.results__value {
		color: var(--color-primary-purple);
	}

	.results__label {
		color: var(--color-neutral-800);
	}

	/* Active states */

	.button:hover,
	.button:focus {
		background-color: var(--color-neutral-800);
	}

	/* Media query */

	@media (min-width: 50rem) {
		.card {
			align-self: center;

			padding: 3.5rem;
			border-radius: 2rem 2rem 12.5rem 2rem;

			row-gap: 4.5rem;
		}

		.button--submit {
			width: 6rem;
			height: 6rem;
			padding: 1.5rem;
			left: 100%;
			transform: translateY(50%) translateX(-100%);
		}
	}
</style>
