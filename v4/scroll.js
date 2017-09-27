$(function(){
  /* 滚动条 */
  var prev = $('body').scrollTop();/* 页面加载时滚动条高度 */

  $(window).on('scroll',function(){
    var num = 1;
  
    var win = $(window).height();/* 屏幕高度 */
    var tim = $('#time').height();/* #time高度 */
    var now = $('body').scrollTop();/* 当前滚动条高度 */
    
    num = Math.floor( now/win ) ;
    console.log(num);


    /* 当页面滚动到当前1/3 和 1/2 之间 并且向下滚动 */
    
    if( (now > ((win-num*win)/3 + tim)) && (now < ((win-num*win)*2/3 + tim)) && prev<now){
      $('body').animate({scrollTop:win*(num+1)+tim},600);

    }



    prev = now;



    if(now  == ( win/2 + tim)){
      $('body').animate({scrollTop:win+tim},600);
    }
  /*   console.log(win);
    console.log(tim);
    num = (now - tim) / win;
    console.log(num); */
    // console.log($('body').scrollTop());
    // console.log($(this).scrollTop());
  })

})