const { Component } = await SemiReactive.import("core.js");

export default class Loading extends Component
{
	constructor() {
		super();
	}

	render() {
		return `
			<div class="w-100 h-100 d-flex flex-column justify-content-center">
				<img class="img-fluid d-block m-auto" src="./images/load.gif" />
			</div>
		`;
	}
}