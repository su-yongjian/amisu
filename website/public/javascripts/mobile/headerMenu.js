$('#menu').on("click", function () {
    $("#item-list").slideToggle(500);
    $(".mark").slideToggle(250);
    if ($("#menu").hasClass("menu-icon")) {
        $("#menu").removeClass("menu-icon").addClass("close-icon")
    } else {
        $("#menu").removeClass("close-icon").addClass("menu-icon")
    }
});

$('#mark').on("click", function () {
    $("#item-list").slideUp(500);
    $(".mark").slideUp(250);
    $("#menu").removeClass("close-icon").addClass("menu-icon")
});