export function adjustDataTables() {
	$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
}