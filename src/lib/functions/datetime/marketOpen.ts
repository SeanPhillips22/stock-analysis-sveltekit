/**
 * This function returns the current market open status.
 * If it's between 9:30 am and 4:00 pm on a weekday, it's open.
 * EXCEPT if it's a holiday or day that closes at 1:00 pm.
 */
export function marketOpen(): 'open' | 'closed' | 'pre' | 'post' | any {
	const holidays = [
		'May 30 2022',
		'June 20 2022',
		'July 4 2022',
		'September 5 2022',
		'November 24 2022',
		'December 26 2022'
	]

	const closeEarly = ['November 25 2022']

	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York',
		weekday: 'short',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false
	})

	let bits = now.split(',')
	let day = bits[0]
	let date = bits[1].trim()
	let month = date.split(' ')[0]
	let dayOfMonth = date.split(' ')[1]
	let year = bits[2].trim()
	let hour = Number(bits[3].trim().split(':')[0])
	let minute = Number(bits[3].trim().split(':')[1])

	if (day === 'Sun' || day === 'Sat') {
		return 'closed'
	}

	if (holidays.includes(`${month} ${dayOfMonth} ${year}`)) {
		return 'closed'
	}

	if (closeEarly.includes(`${month} ${dayOfMonth} ${year}`)) {
		if (hour >= 4 && (hour < 9 || (hour == 9 && minute < 30))) {
			return 'pre'
		} else if ((hour > 9 || (hour == 9 && minute >= 30)) && hour <= 13) {
			return 'open'
		} else {
			return 'closed'
		}
	}

	if (hour >= 4 && (hour < 9 || (hour == 9 && minute < 30))) {
		return 'pre'
	} else if (hour >= 16 && hour < 20) {
		return 'post'
	} else if ((hour > 9 || (hour == 9 && minute >= 30)) && hour <= 15) {
		return 'open'
	} else {
		return 'closed'
	}
}
