

//var url="http://13.231.133.58";/*url*/
var url="http://ec2-52-199-54-66.ap-northeast-1.compute.amazonaws.com";/*url*/
sessionStorage.setItem('switch', true);
var id_u=sessionStorage['user_id'];
function jiafen(b){
    var nub=sessionStorage['nub'];/*等级*/
    var pai=$("#pai").html();
    if(parseInt(pai)<parseInt(nub)){
        layer.msg("Insufficient cards");
        pai_b=false;
        $("#chartAB").unbind();
    }
    if(b){
        var zhi=parseInt($(".txt_red").html());
        zhi+=parseInt(nub);
        if(parseInt(pai)>=parseInt(nub)){
            pai=pai-nub;
            $(".txt_red").html(zhi);
            $("#pai").html(pai)
        }
    }else {
        var zhi=parseInt($(".txt_black").html());
        zhi+=parseInt(nub);
        if(parseInt(pai)>=parseInt(nub)){
            pai=pai-nub;
            $(".txt_black").html(zhi);
            $("#pai").html(pai)
        }
    }
}
$(".switch_box").on("click",function(){
    if($(".switch").hasClass("on")){
        $(".switch").removeClass("on");
        $(".switch_on").animate({width:"20px"});
        $(this).animate({left:"0"});
        sessionStorage.setItem('switch', true);
    }else {
        sessionStorage.setItem('switch', false);
        $(".switch_on").animate({width:"100%"});
        $(".switch").addClass("on");
        $(this).animate({left:"25px"})
    }
});

/*转账接口输 （转入钱）*/
function zhuanchu(jine){
    var jine=Math.abs(jine);
    $.ajax({
        type: "post",
        url: url+"/index.php?m=Admin&c=Api&a=utransfer",/*给转出*/
        data: {uid :id_u,money:jine},
        dataType: "json",
        async: true,
        success: function(data) {
            $(".dizi").fadeOut();
            console.log(data);
            if (data.status) {

            }
        }
    });
};
/*转出接口 转出钱 赢*/
function zhuanzang(money){
    $.ajax({
        type: "post",
        url: url+"/index.php?m=Admin&c=Api&a=urolloff",/*给卡片充值*/
        data: {uid :id_u,money:money},
        dataType: "json",
        async: true,
        success: function(data) {
            console.log(data);
            if (data.status) {
                layer.msg(data.msg);
                $(".dizi").fadeOut();
            }
        }
    });
};

function update(){
    var address = sessionStorage['address'];
    $.ajax({
        type: "post",
        url: url+"/index.php?m=Admin&c=Api&a=kremaining",
        data: {uid :id_u,address:address},
        dataType: "json",
        async: true,
        success: function(data) {
            if (data.status) {
                sessionStorage.setItem('card',data.remaining);
//					$(".head_img_new .txt_head .number").html(data.remaining+'<i></i>');
            }
        }
    });
};

/*定时更新余额 10秒钟重新渲染次余额数据*/
setInterval(function(){
    $.ajax({
        type: "post",
        url: url+"/index.php?m=Admin&c=Api&a=kremaining",
        data: {uid :id_u,address:address},
        dataType: "json",
        async: true,
        success: function(data) {
            console.log(data);
            if (data.status) {
                sessionStorage.setItem('card',data.remaining);
                $(".whole .right .number").html(data.remaining+'<i></i>');
            }
        }
    });
},15000)