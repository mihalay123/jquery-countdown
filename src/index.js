window.onload = function () {
	var elements = document.getElementsByClassName('video-element')
	console.log('elements', elements)
	for (var element of elements) {
		element.muted = 'muted'
		element.play()
	}
}
