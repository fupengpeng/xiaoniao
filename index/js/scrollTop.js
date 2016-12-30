/**
 * Created by fp on 2016/12/21.
 */

$(function () {
   $(window).scroll(function () {
       if($(this).scrollTop() > 500){/*判断是否在顶部，用于隐藏显示回到顶部按钮   .scrollTop() 获取滚动条的高度*/
           $("#scrollTop_wrap").fadeIn();
       }else {
           $("#scrollTop_wrap").fadeOut();
       }
   });
   /*点击返回顶部*/
   $("#scrollTop").click(function () {
      $(this).parent()/*找到父元素*/
          .animate({"bottom":1000,"opacity":0},400,function () {
              $("#scrollTop_wrap").css("opacity",1).fadeOut(0).css("bottom",200);
          });
          $("body,html").animate({
              scrollTop:0
          },400);
   });
});