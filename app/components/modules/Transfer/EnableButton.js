const { Component, EventEmitter } = await SemiReactive.import("core.js");

export default class EnableButton extends Component
{
	constructor() {
		super({
			enabled: true,
			text: '',
			class: ''
		});
	}

	onFirst(item) {
		const onClick = new EventEmitter('click', item);
		const callback = this.getFunctionAttribute('onclick', item, 'event');
		onClick.then(event => callback(event));
	}

	setEnabled(value) {
		this.enabled = value;
	}

	render() {
		return `
			<button class="${ this.class }" ${ this.enabled ? '' : 'disabled="disabled"' }>
				${ this.text }
			</button>
		`;
	}
}