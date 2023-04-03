export const calculateAge = (currentDate, birthDate, daysInMonths) => {
	const subtractDays = date => {
		if (date.day >= birthDate.day) {
			return {
				day: date.day - birthDate.day,
				month: date.month,
				year: date.year,
			}
		}

		if (date.month > 1) {
			return {
				day: date.day + daysInMonths(date.year)[date.month - 2] - birthDate.day,
				month: date.month - 1,
				year: date.year,
			}
		}

		return {
			day: date.day + 31 - birthDate.day,
			month: 12,
			year: date.year - 1,
		}
	}

	const subtractMonths = date => {
		if (date.month >= birthDate.month) {
			return {
				day: date.day,
				month: date.month - birthDate.month,
				year: date.year,
			}
		}

		return {
			day: date.day,
			month: date.month + 12 - birthDate.month,
			year: date.year - 1,
		}
	}

	const subtractYears = date => {
		return {
			day: date.day,
			month: date.month,
			year: date.year - birthDate.year,
		}
	}

	return subtractYears(subtractMonths(subtractDays(currentDate)))
}
