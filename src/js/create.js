let labels = [];
let colors = [];
let values = [];
const ctxCreate = $("#createChart");
let myChartCreate = new Chart(ctxCreate, {});

$(".btn-add").click(() => {
	$(".chart__create-table")
		.append(
			$("<input></input>")
				.addClass("chart__create-label")
				.attr({ type: "text" })
		)
		.append(
			$("<input></input>")
				.addClass("chart__create-color")
				.attr({ type: "color" })
		)
		.append(
			$("<input></input>")
				.addClass("chart__create-value")
				.attr({ type: "number" })
				.attr({ value: 0 })
		);
	// .chart__create-label
	$("input").on("change keyup paste", () => {
		myChartCreate.destroy();
		labels = [];
		colors = [];
		values = [];
		$(".chart__create-label")
			.toArray()
			.map((item) => {
				labels.push(item.value);
			});

		$(".chart__create-color")
			.toArray()
			.map((item) => {
				colors.push(item.value);
			});

		$(".chart__create-value")
			.toArray()
			.map((item) => {
				values.push(item.value);
			});
		myChartCreate = new Chart(ctxCreate, {
			type: "bar",
			data: {
				labels: labels,
				datasets: [
					{
						// label: '# of Votes',
						data: values,
						backgroundColor: colors,
						borderColor: colors,
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	});
});
