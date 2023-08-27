Date.prototype.daysInMonth = function () {
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
}

const calendar = document.querySelector('#calender')
const dates = calendar.querySelector('#dates')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const info = document.querySelector('#info')
const MONTHS = {
	1: 'Январь',
	2: 'Февраль',
	3: 'Март',
	4: 'Апрель',
	5: 'Май',
	6: 'Июнь',
	7: 'Июль',
	8: 'Август',
	9: 'Сентябрь',
	10: 'Октябрь',
	11: 'Ноябрь',
	12: 'Декабрь'
}
const currentDay = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()
const daysQty = new Date(currentYear, currentMonth).daysInMonth()
const firstDay = new Date(currentYear, currentMonth).getDay()
const weekQty = getWeeksQty(daysQty)
const endQty = weekQty * 7 - firstDay - daysQty
const arrNumWithStartEnd = arrNumbersWithBlank(daysQty, firstDay, endQty)
const today = new Date().getDate()

let changedYear = currentYear
let changedMonth = currentMonth

renderInfo(currentMonth + 1, currentYear)
renderCalendar(weekQty, arrNumWithStartEnd, currentMonth, currentYear)

function getWeeksQty(days) {
	// return Math.ceil(days / 7)
	return 6
}

function renderCalendar(weekQty, arr, month, year) {
	for (let i = 0; i < weekQty; i++) {
		const week = document.createElement('tr')
		week.setAttribute('id', `${month}-${year}`)
		for (let j = 0; j < 7; j++) {
			const day = document.createElement('td')
			week.append(day)
		}
		dates.append(week)
	}
	const dateName = dates.querySelectorAll('td')
	dateName.forEach((el, index) => {
		el.setAttribute('id', arr[index])
		el.classList.add('all-dates')
		if (arr[index] !== '') {
			el.classList.add('dates')
		}
		el.innerHTML = arr[index]
		if (
			+el.id === currentDay &&
			el.parentElement.id === `${currentMonth}-${currentYear}`
		) {
			el.classList.add('active-date')
		}
	})
}

function clear(element) {
	element.innerHTML = ''
}

function arrNumbersWithBlank(dQty, startQty, endQty) {
	const arr = []
	for (let i = 0; i < dQty; i++) {
		arr.push(i + 1)
	}
	for (let i = 0; i < startQty - 1; i++) {
		arr.unshift('')
	}
	for (let i = 0; i < endQty + 1; i++) {
		arr.push('')
	}
	return arr
}

function getDateForRender(year, month, wQty) {
	const daysQtyForRender = new Date(year, month).daysInMonth()
	const firstDayForRender = new Date(year, month).getDay()
	const endQtyForRender = wQty * 7 - firstDayForRender - daysQtyForRender
	if (firstDayForRender === 0) {
		return [daysQtyForRender, 7, endQtyForRender]
	}

	return [daysQtyForRender, firstDayForRender, endQtyForRender]
}

prev.addEventListener('click', () => {
	changedMonth--
	if (changedMonth < 0) {
		changedMonth = 11
		changedYear--
		const changedDate = getDateForRender(changedYear, changedMonth, 6)
		const changedArr = arrNumbersWithBlank(...changedDate)
		clear(dates)
		renderInfo(changedMonth + 1, changedYear)
		renderCalendar(6, changedArr, changedMonth, changedYear)
	} else {
		const changedDate = getDateForRender(changedYear, changedMonth, 6)
		const changedArr = arrNumbersWithBlank(...changedDate)
		clear(dates)
		renderCalendar(6, changedArr, changedMonth, changedYear)
		renderInfo(changedMonth + 1, changedYear)
	}
})

next.addEventListener('click', () => {
	changedMonth++
	if (changedMonth > 11) {
		changedMonth = 0
		changedYear++
		const changedDate = getDateForRender(changedYear, changedMonth, 6)
		const changedArr = arrNumbersWithBlank(...changedDate)
		clear(dates)
		renderInfo(changedMonth + 1, changedYear)
		renderCalendar(6, changedArr, changedMonth, changedYear)
	} else {
		const changedDate = getDateForRender(changedYear, changedMonth, 6)
		const changedArr = arrNumbersWithBlank(...changedDate)
		clear(dates)
		renderCalendar(6, changedArr, changedMonth, changedYear)
		renderInfo(changedMonth + 1, changedYear)
	}
})

function renderInfo(month, year) {
	info.innerHTML = `${MONTHS[month]} ${year}`
}
