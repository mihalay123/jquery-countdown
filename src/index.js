;(function () {
	const TIMER_CONFIG = [
		{ type: 'seconds', accessor: 'secondsLeft' },
		{ type: 'minutes', accessor: 'minutesLeft' },
		{ type: 'hours', accessor: 'hoursLeft' },
		{ type: 'days', accessor: 'daysLeft' },
	]

	let isTimerMounted = false

	function getEndDate(container) {
		const endDate = container.data().endDate
		const formattedDate = new Date(endDate)

		if (!endDate || !formattedDate) {
			return new Date()
		}

		return formattedDate
	}

	function calculateExpiresTime(endDate) {
		const ONE_SECOND = 1000
		const ONE_MINUTE = ONE_SECOND * 60
		const ONE_HOUR = ONE_MINUTE * 60
		const ONE_DAY = 24 * 60 * 60 * 1000

		const todayDate = new Date()
		const dateDifference = Math.abs(todayDate - endDate)

		const daysLeft = Math.max(0, Math.floor(dateDifference / ONE_DAY))
		const hoursLeft = Math.max(0, Math.floor((dateDifference / ONE_HOUR) % 24))
		const minutesLeft = Math.max(
			0,
			Math.floor((dateDifference / ONE_MINUTE) % 60)
		)
		const secondsLeft = Math.max(
			0,
			Math.floor((dateDifference / ONE_SECOND) % 60)
		)

		return {
			daysLeft,
			hoursLeft,
			minutesLeft,
			secondsLeft,
		}
	}

	function createElement(value, type) {
		return `<li class="flip-item-${type}">${value}</li>`
	}

	function initTimer() {
		const container = $('#flip-clock-container')

		const endDate = getEndDate(container)
		const expiresTime = calculateExpiresTime(endDate)

		TIMER_CONFIG.forEach(function ({ type, accessor }) {
			const currentExpires = expiresTime[accessor]
			const childElement = createElement(currentExpires, type)
			container.append(childElement)
		})
		renderTimer(jQuery)
	}

	function unmountTimer() {
		const container = $('.flip-clock-container')
		container.html('')
	}

	$(document).ready(() => {
		initTimer()
		isTimerMounted = true
	})

	const showIsHidden = () => {
		setTimeout(() => {
			showIsHidden()
		}, 200)
	}

	document.addEventListener('visibilitychange', () => {
		if (document.hidden && isTimerMounted) {
			unmountTimer()
			isTimerMounted = false
		}

		if (!document.hidden && !isTimerMounted) {
			initTimer()
			isTimerMounted = true
		}
	})
})()
