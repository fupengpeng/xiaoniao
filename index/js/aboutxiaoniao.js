/**
 * Created by fp on 2016/12/23.
 */
$(function () {
    $(".wrap_block,.main_wrap,.gaishu").css("height",($(window).height()-50)+"px");
    $(".wrap_block,.gaishu_block").width($(window).width());
    $(window).resize(function () {
        /*当屏幕改变时*/
        console.log("获取屏幕的高宽");
        $(".wrap_block,.main_wrap,.gaishu").css("height",($(window).height()-50)+"px");
        $(".wrap_block,.gaishu_block").width($(window).width());
    })

    /*动画*/

    /*全屏部分*/
    var mainSlideDelay = 0;
    var mainSlideIndex = 0;
    var mainSlideTimer = null;
    var mainSlideGoing = false;
    var scrollFunc=function (e) {
        e=e||window.event;
        if (e.wheelDelta){
            /*浏览器滚动事件*/
            if(e.wheelDelta>0){/*滚轮向上滚动*/
                console.log("滚轮向上滚动")
                mainSlideUp();

            }else
                if (e.wheelDelta<0){/*滚轮向下滚动*/
                console.log("滚轮向下滚动")
                mainSlideDown();

            }
        }
        else if (e.detail){
            /*火狐的滚动事件*/
            if(e.detail>0){
                /*向下滚动*/
                alert(3);
            }else if (e.detail<0){
                /*向上滚动*/
                alert(4);
            }
        }
    }
    /*火狐事件绑定*/
    if(document.addEventListener){
        document.addEventListener("DOMMouseScroll",scrollFunc,false);
    }
    /*ie,chrome事件绑定*/
    window.onmousewheel = document.onmousewheel = scrollFunc;
    /*向下滚动*/
    function mainSlideDown() {
        if (mainSlideDelay<1){
            clearInterval(mainSlideTimer);
            mainSlideTimer=setTimeout(function () {
                mainSlideDelay++;
                console.log("调用向下滚动的方法11111");
            },100)
        }else if (!mainSlideGoing){
            mainSlideGoing = true;
            mainSlideIndex++;
            console.log("调用向下滚动的方法22222222");
            if (mainSlideIndex>$(".wrap_block").length-2){
                mainSlideIndex=$(".wrap_block").length-2;
                console.log("调用向下滚动的方法33333333");
            }
            console.log("调用向下滚动的方法4444444");
            mainSlideGo();
        }
    }

    /*向上滚动*/
    function mainSlideUp() {
        if (mainSlideDelay<1){
            clearInterval(mainSlideTimer);
            mainSlideTimer=setTimeout(function () {
                mainSlideDelay++;
                console.log("调用向上滚动的方法11111");
            },100)
        }else if (!mainSlideGoing){
            mainSlideGoing=true;
            mainSlideIndex--;
            console.log("调用向上滚动的方法222222");
            if (mainSlideIndex<=0){
                mainSlideIndex=0;
                console.log("调用向上滚动的方法33333");
            }
            console.log("调用向上滚动的方法44444");
            mainSlideGo();
        }
    }

    /*滚动参数*/
    function mainSlideGo() {
        $(".main_slide").animate({"top":"-"+$(".wrap_block").height()*mainSlideIndex},600,
            "easeBothStrong",function () {
            mainSlideGoing=false;
            mainSlideDelay=0;
            console.log("滚动参数");
            if (mainSlideIndex==0){
                alert("调用mainSlideGo方法")
            }else if (mainSlideIndex==4){
                $(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
                $(".nav_piece").eq(mainSlideIndex).addClass("now");
                alert("调用滚动滚轮页面变化111111111")
            }else {
                $(".nav_piece").removeClass("now").eq(mainSlideIndex-1).addClass("now");
                alert("调用滚动滚轮页面变化22222222222")
            }
        });
    }

    /*点击导航栏的标题， 跳转至对应的页面*/
    $(".nav_piece h1").click(function () {
        var navIndex = $(this).parent().index(".nav_piece");/*找到当前h1标签的父级，类名为  .nav_piece 的索引值*/
        console.log("navIndex"+navIndex);
        if (navIndex==4){/*由于第三个和第四个标题点击后是相同的页面，故当等于4时，让其还是展示第三个页面*/
            navIndex = 3;
        }
        if (navIndex!=5){
            mainSlideIndex = navIndex + 1;
            console.log("mainSlideIndex"+mainSlideIndex)
            mainSlideGo();
        }
    })


    /*第一页面  点击向下按钮   页面下翻*/
    $(".welcome2_content .donext").click(function () {
        mainSlideIndex = 1;
        mainSlideGo();
    });

    /*第二页面  点击左右按钮时，页面实现左右切换*/
    /*实现步骤：
    *     1.获取屏幕宽度
    *     2.设置屏幕切换事件（使用包含块内的页面块索引值进行控制）
    *     3.设定点击事件，实现左右切换*/
    /*移除点击右边按钮后，从动画转换为静态*/
    $(".gaishu_goright").mouseenter(function () {
        $(this).removeClass("nohover");
    })
    /*设置左边的按钮浅色*/
    $(".gaishu_goleft").css("opacity",0.5)
    /*设置左右边按钮的点击切换页面*/
    var gaishuIndex = 0;
    $(".gaishu_goright").click(function () {
        gaishuIndex++;
        if (gaishuIndex>2){
            gaishuIndex = 2;
        }else {
            /*轮播动作*/
            gaishuMove();
        }

    })

    /*设置左边按钮点击事件的页面切换*/
    $(".gaishu_goleft").click(function () {
        gaishuIndex--;
        if (gaishuIndex<0){
            gaishuIndex = 0;
            $(".gaishu_goleft").css("opacity",0.5)
        }else {
        /*轮播动作*/
        gaishuMove();
    }
    })

    /*概述轮播的方法进行封装*/
    function gaishuMove() {
        $(".gaishu_goleft,.gaishu_goright").css("opacity",0.5)/*点击按钮时，让左右按钮的颜色先变成浅色*/
        $(".gaishu_slider").animate({"left":"-"+$(".gaishu_block").width()*gaishuIndex+"px"},600,function () {
            $(".gaishu_goright,.gaishu_goleft").css("opacity",1);/*点击过后，页面变化后，让按钮的颜色又变回深色*/
        })
    }

    /*小鸟价值里面的呼吸灯效果*/
    setInterval(function () {
        $(".jiazhi_shan").fadeOut(1200,function () {
            console.log("呼吸灯效果实现");
            $(".jiazhi_shan").delay(100)
                .fadeIn(600);
        })
    })

})