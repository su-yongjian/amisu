$(function(){
    $(window).scroll(function(){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if(scrollTop>500){
            $("#toTop").css({
                display:"block"
            })
        }else{
            $("#toTop").css({
                display:"none"
            })
        }
    });
    $("#toTop").on("click",function(){
        $("html,body").animate({scrollTop: '0px'},200)
    })
})