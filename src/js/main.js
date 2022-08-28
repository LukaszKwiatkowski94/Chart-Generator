$(".chart__create-box").hide();
$(".footer__year").text(new Date().getFullYear());
$(".chart__demo-btn").click(() => {
	$(".chart__create-box").fadeOut(500);
	$(".chart__demo-box").delay(500).fadeIn(500);
});
$(".chart__create-btn").click(() => {
	$(".chart__demo-box").fadeOut(500);
	$(".chart__create-box").delay(500).fadeIn(500);
});
