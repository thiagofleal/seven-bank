import Controller from './components/Controller.js';

document.body.onkeydown = function (event) {
	if (event.keyCode === 116) {
		return false;
	}
}

document.body.onload = function() {
	(new Controller()).show('#app');
}