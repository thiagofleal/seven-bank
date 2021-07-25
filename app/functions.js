export function adjustDataTables() {
	$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
}

export function showValue(str) {
	return str || "";
}

function formatZero(value, qtd) {
	if (qtd === undefined) {
		qtd = 2;
	}
	value = ("" + value).trim();

	while (value.length < qtd) {
		value = '0' + value;
	}
	return value;
}

export function formatDate(str) {
	const date = new Date(str);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `<span class="d-none">${ str }</span>${ formatZero(day) }/${ formatZero(month) }/${ year }`;
}

export function formatDateHour(str) {
	const date = new Date(str);
	const hours = date.getHours();
	const minutes = date.getMinutes();

	return `${ formatDate(str) } ${ formatZero(hours) }:${ formatZero(minutes) }`;
}

export function formatMoney(value) {
	const parts = (+value).toFixed(2).split('.');

	if (parts.length !== 2) {
		return "!Erro";
	}
	
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return `${ parts[0] },${ parts[1] }`;
}