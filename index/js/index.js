/**
 * Created by fp on 2016/12/15.
 */
$(function () {
    $("#header").load("header.html");/*加载其他html页面*/
    $("#footer").load("footer.html");/*加载底部html页面*/
    (function () {

        var ODiv = $(".banner_wrap");
        var oPrev = $(".prev");
        var oNext = $(".next");
        var oSpan = $(".middle span");
        var nowIndex = 0;
        var animateFater = null;
        /*图片运动效果*/
        /*当页面加载完成先运动一下  第一页（只需要将banner内部的image运动，把）*/
        /*单独提出*/
        animateFater = $(".banner_one").eq(0);
        animateImage();
        /*小圆点的点击事件*/
        oSpan.click(function () {
           nowIndex=$(this).index();
           bannerAnimate();
        });
        /*点击上一张按钮*/
        oPrev.click(function () {
           if(nowIndex>0){
               nowIndex--;
           }else {
               nowIndex=2;
           }
           bannerAnimate();
        });
        /*点击下一张按钮*/
        oNext.click(function () {
            if(nowIndex<2){
                nowIndex++;
            }else {
                nowIndex = 0;
            }
            bannerAnimate();/*执行banner切换方法*/
        });

        /*banner 执行的方法bannerAnimate（）；*/
        function bannerAnimate() {
            $(".middle span").removeClass("now");/*移除now属性*/
            $(".middle span").eq(nowIndex).addClass("now");
            $(".banner_one").fadeOut(200);/*隐藏banner_one*/
            animateFater = $(".banner_one").eq(nowIndex);
            animateFater.fadeIn(200);
            animateImage();
        }

        /*图片运动效果*/
        function animateImage() {
            console.log("大家好");
            animateFater.find(".image01").show().addClass("animated fadeInLeft");/*给第一张文字图片添加类名（样式）*/
            setTimeout(function () {/*计时器 过300毫秒后展示第二第三张文字图片*/
                animateFater.find(".image02").show().addClass("animated bounceInRight");
                animateFater.find(".image02").show().addClass("animated fadeIn");
            },300);/*300毫秒以后再执行计时器里面的方法*/
        }
        /*待完成部分*/
    })();

    /*主要产品-----js部分*/
    /*为了避免和其他部分代码之间的变量相互影响，将js写成函数自执行的形式，避免了与其他代码的耦合性*/
    (function () {
        var oDiv=$("#chanpin01");
        var oPrev=oDiv.find(".prev");
        var oNext=oDiv.find(".next");
        var aDot=oDiv.find(".now_linebtn_one");
        var aSpan=oDiv.find(".now_line span");
        var aContents=oDiv.find(".content_one");
        var nowIndex=0;
        /*左边导航线的点击事件*/
        aSpan.click(function () {
            var index=aDot.index($(this).parent());//获取父元素的索引值
            var action = (nowIndex>index)?"fadeInLeft":"fadeInRight";/*三目运算符  如果条件成立执行fadeInLeft  否则  执行fadeInRight*/
            nowIndex = index;
            doFade(action);/**/
        });
        /*下一张按钮的点击事件*/
        oNext.click(function () {
            nowIndex++;
            if(nowIndex>=aDot.length){
                nowIndex=0;
            }
            doFade("fadeInLeft");
        });
        /*上一张的点击事件*/
        oPrev.click(function () {
           nowIndex--;
           if(nowIndex<0){
               nowIndex=aDot.length-1;
           }
           doFade("fadeInRight")
        });


        /*doFade()方法*/
        function doFade(action) {
            aDot.removeClass("now").eq(nowIndex).addClass("now");
            aContents.fadeOut(0)/*淡出*/
                .eq(nowIndex).fadeIn(200);/*在200毫秒内。。。。。。*/
            aContents.eq(nowIndex).find("h1,p,img").attr("class","").addClass("animated"+action);
        }
    })();
    //公司简介部分只有一页 让所有的切换点击隐藏
    $(".jianjie .now_line, .jianjie .change_line span").css("opacity",'0');
    /*业务范围*/
    (function () {
        var oDiv = $(".yewu");/*获取业务范围标签*/
        var aCentering = oDiv.find(".centering");
        var aIcons = oDiv.find(".sousuo_icon");
        var aDitails = oDiv.find(".yewucontent_detail");
        var nowIndex = 0;
        /*鼠标移入图片有抖动效果*/
        aIcons.add(aCentering)/*add方法意思是"a和b"，不区分顺序*/
            .hover(function () {
            $(this).addClass("animated tada");
        },function () {
                $(this).removeClass("animated tada");
            });
        /*鼠标点击乘号图片展示下面内容*/
        aIcons.click(function () {
            nowIndex = aIcons.index($(this));/*获取当前this的索引值，并赋值给nowIndex*/
            console.log(nowIndex);
            doSlide();
        });
        /*图片切换事件*/
        aCentering.click(function () {
            nowIndex = aCentering.index($(this));
            doSlide();
        })
        /*展开函数*/
        function doSlide() {
            /*判断是否展开*/
            if(aIcons.eq(nowIndex).hasClass("zhankai")){/*判断当前对象是否含有“zhankai”类名（类型--属性）*/
                aDitails.stop().slideUp(300);
                aIcons.removeClass("zhankai");
            }else {
                aDitails.stop().slideUp(300).eq(nowIndex).slideDown(300);
                aIcons.removeClass("zhankai").eq(nowIndex).addClass("zhankai");
            }
        }
    })();
    //团队成员
    (function(){
        var oDiv = $(".teamcontent_wrap");
        var oPrev = $(".prev");
        var oNext = $(".next");
        var moveDiv = oDiv.find(".team_move");
        var timer = null;
        var nextTimer = null;
        var prevTimer = null;
        var nowIndex = 0;

        //点击下一张图片事件
        oNext.click(function(){
            clearTimeout(nextTimer);
            nextTimer = setTimeout(function(){
                doNext();
            },200)
        });
        //点击上一张图片
        oPrev.click(function(){

            clearTimeout(prevTimer);
            prevTimer = setTimeout(function () {
                doPrev()
            },200)
        });
        function doPrev(){

            moveDiv.find(".twoteam_wrap:last").insertBefore(moveDiv.find(".twoteam_wrap:first"));

            moveDiv.animate({"left":"-1100px"},0);
            console.log("bb");
            moveDiv.animate({"left":"0px"},1000,"backOut");
            nowIndex--;
            if(nowIndex<0){
                nowIndex = 2;
            }
            oDiv.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now");
        };
        oDiv.hover(function(){
            clearInterval(timer);
        },autoMove);
        function autoMove(){
            clearInterval(timer);
            timer = setInterval(function(){
                doNext();
            },5500)
        }
        function doNext(){
            moveDiv.animate({"left":"-1100px"},1000,"backIn",function(){
                moveDiv.find(".twoteam_wrap:first").appendTo(moveDiv);
                moveDiv.animate({"left":"0"},0);
            });
            nowIndex++;
            if(nowIndex>2){
                nowIndex = 0;
            }
            oDiv.find(".middle_points").find("span").removeClass("now").eq(nowIndex).addClass("now");
        };
    })();

});
