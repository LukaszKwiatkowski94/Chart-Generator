$(".chart__create-box").hide();
$(".footer__year").text(new Date().getFullYear());
$(".chart__demo-btn").css("background-color", "rgb(252, 249, 198)");
$(".chart__demo-btn").click(() => {
	$(".chart__create-box").fadeOut(500);
	$(".chart__demo-box").delay(500).fadeIn(500);
	$(".chart__demo-btn").css("background-color", "rgb(252, 249, 198)");
	$(".chart__create-btn").css("background-color", "rgb(224, 222, 202)");
});
$(".chart__create-btn").click(() => {
	$(".chart__demo-box").fadeOut(500);
	$(".chart__create-box").delay(500).fadeIn(500);
	$(".chart__create-btn").css("background-color", "rgb(252, 249, 198)");
	$(".chart__demo-btn").css("background-color", "rgb(224, 222, 202)");
});
