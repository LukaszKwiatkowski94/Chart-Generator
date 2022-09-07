const ctx = $("#demoChart");
const demoTable = $(".chart__demo-table");

let data = [];
let labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
let colors = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
let newDataset = [];
for (let i = 0; i < 6; i++) {
	data.push(Math.floor(Math.random() * 5) + 1);
}

const myChart = new Chart(ctx, {
	type: "bar",
	data: {
		labels: labels,
		datasets: [
			{
				label: "Colors in demo chart",
				data: data,
				backgroundColor: "white",
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
