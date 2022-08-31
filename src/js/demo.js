const ctx = $("#demoChart");
const demoTable = $(".chart__demo-table");

let data = [];
let labels = [];
let colors = [];
$(".chart__demo-values")
	.children()
	.toArray()
	.map((item) => {
		data.push(item.innerHTML);
	});
$(".chart__demo-labels")
	.children()
	.toArray()
	.map((item) => {
		labels.push(item.innerHTML);
	});
$(".chart__demo-colors")
	.children()
	.toArray()
	.map((item) => {
		colors.push(item.getAttribute('data-color'))
	});

const myChart = new Chart(ctx, {
	type: "bar",
	data: {
		labels: labels,
		datasets: [
			{
				// label: '# of Votes',
				data: data,
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
