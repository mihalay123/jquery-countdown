import './styles.css'
import $ from 'jquery'

const TIMER_CONFIG = [
	{ type: 'seconds', accessor: 'secondsLeft' },
	{ type: 'minutes', accessor: 'minutesLeft' },
	{ type: 'hours', accessor: 'hoursLeft' },
	{ type: 'days', accessor: 'daysLeft' },
]

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

function initTimer(endDate) {
	const expiresTime = calculateExpiresTime(endDate)

	const container = $('.flip-clock-container')

	TIMER_CONFIG.forEach(function ({ type, accessor }) {
		const currentExpires = expiresTime[accessor]
		const childElement = createElement(currentExpires, type)
		container.append(childElement)
	})
}

const endDate = Date.UTC(2022, 11, 6, 12, 43, 40)

initTimer(endDate)
