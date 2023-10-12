import { Dispatch, SetStateAction, useState } from "react";

export default function Table({
	columns,
	rows,
	elementShowSelectMultiple
}: {
	columns: string[];
	rows: { [key: string]: string | boolean | number }[];
	elementShowSelectMultiple: boolean;
}) {
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<"ascending" | "descending">("ascending");

	if (sortColumn) {
		if (sortOrder == "ascending") {
			rows.sort((a, b) =>
				(a[sortColumn] || "").toString() > (b[sortColumn] || "").toString()
					? 1
					: -1
			);
		} else {
			rows.sort((a, b) =>
				(a[sortColumn] || "").toString() < (b[sortColumn] || "").toString()
					? 1
					: -1
			);
		}
	}
	return (
		<div className="overflow-y-auto w-full relative">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-300">
						<THeader
							columns={columns}
							sortOrder={sortOrder}
							setSortOrder={setSortOrder}
							sortColumn={sortColumn}
							setSortColumn={setSortColumn}
							elementShowSelectMultiple={elementShowSelectMultiple}
						/>
					</tr>
				</thead>
				<tbody>
				{rows && rows.map((row) => {
					return (
						<tr className="group w-full border-b last:border-b-0 hover:bg-gray-100 relative">
							<TCell
								columns={columns}
								row={row}
									elementShowSelectMultiple={elementShowSelectMultiple}
							/>
						</tr>
					);
					})}
				</tbody>
			</table>
		</div>
	);
}

function THeader({
	columns,
	sortOrder,
	setSortOrder,
	sortColumn,
	setSortColumn,
	elementShowSelectMultiple
}: {
	columns: string[];
	sortOrder: "ascending" | "descending";
	setSortOrder: Dispatch<SetStateAction<"ascending" | "descending">>;
	sortColumn: string | null;
	setSortColumn: Dispatch<SetStateAction<string | null>>;
	elementShowSelectMultiple: boolean;
}) {
	return columns.map((col, index) => {
		return (
			<td
				key={col}
				className={
					"select-none min-w-[6rem] max-w-[14rem] font-medium" +
					" text-bb uppercase px-3 py-2 hover:bg-gray-100 cursor-pointer" +
					" first:sticky first:left-0 first:bg-white first:border-r"
				}
				onClick={() => {
					if (sortColumn === col) {
						// just change sort sortOrder
						setSortOrder((val) =>
							val === "ascending" ? "descending" : "ascending"
						);
					} else {
						setSortColumn(col);
						setSortOrder("ascending");
					}
				}}
				title={col.replaceAll("_c", "")}
			>
				<div className="flex place-items-center gap-1">
					{index === 0 && elementShowSelectMultiple && <div className="inline-block w-8"></div>}
					{sortColumn === col && (
						<div
							className={
								"block ic " +
								(sortOrder === "ascending"
									? "ic-up-arrow rotate-180"
									: "ic-up-arrow")
							}
						></div>
					)}
					<span
						className={
							sortColumn === col
								? "text-gray-600 font-bold"
								: "text-gray-500"
						}
					>
						{col.replaceAll("_c", "")}
					</span>
				</div>
			</td>
		);
	});
}

const cellStyle =
	"py-2 px-3 text-sm truncate first:font-medium" +
	" text-gray-700 first:underline first:underline-offset-2" +
	" first:hover:cursor-pointer first:sticky first:z-[4] first:left-0" +
	" first:bg-gray-50 first:border-r first:mx-px first:border-separate" +
	" min-w-[6rem] max-w-[14rem]";

function TCell({
	columns,
	row,
	elementShowSelectMultiple
}: {
	columns: string[];
	row: { [key: string]: string | boolean | number };
		elementShowSelectMultiple: boolean;
}) {


	return (
		<>
			{columns.map((col, index) => {
								return typeof row[col] === "boolean" ? (
									<td className="text-center min-w-[6rem] max-w-[14rem] px-2">
										{row[col] ? (
											<div className="bg-dodger-600 rounded-full w-3 h-3 flex place-items-center justify-center">
												<span className="ic-sm ic-white ic-done"></span>
											</div>
										) : (
											<div className="bg-gray-400 rounded-full w-3 h-3 flex place-items-center justify-center">
												<span className="ic-sm ic-white ic-close"></span>
											</div>
										)}
									</td>
								) : (
									<td
										className={cellStyle}
										title={row[col]?.toString()}
									>
										{index == 0 && elementShowSelectMultiple && <div className="inline-block w-9 scale-[0.8]"><input type="checkbox" name={row.id.toString() as string}/></div>}
										{row[col]}
									</td>
								);
							})}
								</>
	);
}
