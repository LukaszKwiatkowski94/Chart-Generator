let countOfElements = 0;
let labels = [];
let colors = [];
let values = [];
const ctxCreate = $("#createChart");
let myChartCreate = new Chart(ctxCreate, {});

$(".btn-add").click(() => {
	$(".chart__create-table").append(
		$("<div></div>")
			.addClass("chart__create-table-item")
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
			)
			.append(
				$("<button></button>")
					.addClass("chart__create-remove")
					.text("Remove")
					.click((e) => {
						countOfElements--;
						$(e.target).parent().remove();
						checkButton();
						reloadChart();
					})
			)
	);
	$("input").on("change keyup paste", () => {
		reloadChart();
	});
	countOfElements++;
	checkButton();
});

const reloadChart = () => {
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
};

const checkButton = () => {
	if (countOfElements >= 10) {
		$(".btn-add").attr("disabled", true);
	} else {
		$(".btn-add").attr("disabled", false);
	}
};
