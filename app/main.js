import Controller from './components/Controller.js';
import { adjustDataTables } from './functions.js';

document.body.onkeydown = function (event) {
	if (event.keyCode === 116) {
		return false;
	}
};

window.onresize = function (event) {
	adjustDataTables();
};


export default Controller;