const required = value => {
	if (value === "" || value == null) {
		return {
			required: {
				error: true,
				message: "The field is required",
			},
		}
	}

	return { required: { error: false } }
}

const isValidDay = day => {
	if (day < 1 || day > 31) {
		return {
			isValidDay: {
				error: true,
				message: "Must be a valid day",
			},
		}
	}

	return { isValidDay: { error: false } }
}

const isValidMonth = month => {
	if (month < 1 || month > 12) {
		return {
			isValidMonth: {
				error: true,
				message: "Must be a valid month",
			},
		}
	}

	return { isValidMonth: { error: false } }
}

const isInThePast = currentYear => {
	return year => {
		if (year > currentYear) {
			return {
				isInThePast: {
					error: true,
					message: "Must be in the past",
				},
			}
		}

		return { isInThePast: { error: false } }
	}
}

const isValidDate = monthLength => {
	return date => {
		if (date.day > monthLength(date.year)[date.month - 1] && date.day <= 31) {
			return {
				isValidDate: {
					error: true,
					message: "Must be a valid date",
				},
			}
		}

		return { isValidDate: { error: false } }
	}
}

export const Validators = {
	required,
	isValidDay,
	isValidMonth,
	isInThePast,
	isValidDate,
}
