$(function(){
  /* .con在父元素中居中 */

  $('.wrap').each(function(index,ele){
    $(ele).find('.con').css({'top':($(ele).height()-$(ele).find('.con').height())/2,'left':($(ele).width()-$(ele).find('.con').width())/2});
  });
  $('body').css({'padding-bottom':$('#fix').height()});

  $(window).on('load',function(){
    $('.wrap').each(function(index,ele){
      $(ele).find('.con').css({'top':($(ele).height()-$(ele).find('.con').height())/2,'left':($(ele).width()-$(ele).find('.con').width())/2});
    });
    $('body').css({'padding-bottom':$('#fix').height()});
  });

  $(window).on('resize',function(){
    $('.wrap').each(function(index,ele){
      console.log($(ele).width());
      $(ele).find('.con').css({'top':($(ele).height()-$(ele).find('.con').height())/2,'left':($(ele).width()-$(ele).find('.con').width())/2});
    });
    $('body').css({'padding-bottom':$('#fix').height()});
  });

/* 自动轮播 */
  $('.sec .show ul').each(function(index,ele){
    var num = $(ele).find('li').length;
    $(ele).width(num*330);
    var current = 0;
    $(ele).timer = setInterval(function(){
      current++;
      if(current >= num){
        current = 1;
        $(ele).css({'left':0});
      }
      $(ele).animate({'left':(0-current*330)},600,'swing');
    },5000);
  });
/* .show高度调整 */
  $('.show').each(function(index,ele){
    if(index == 0){
      /* 底部对齐 */
      $(ele).css({'margin-top':($(ele).parents('.con').eq(0).height()-$(ele).height())});
    }else{
      /* 居中对齐 */
      $(ele).css({'margin-top':($(ele).parents('.con').eq(0).height()-$(ele).height())/2});
    }
   
  });


  console.log($(document).height());
  console.log($(window).height());
/* 点击参与滚动到页面底部 */
$('.jump').on('click',function(){
  $('body').animate({scrollTop:$(document).height()-$(window).height()},300);
  /* $(window).scrollTop($(document).height()-$(window).height()); */
});






  /*表单验证*/

  
 
 
  /*获取验证码*/
  $('.getVerify').click(function () {
    var parent = $(this).parents('form');
    parent.num = 0;
    get_verify(parent);
  });
  function get_verify(parent) {
    var parent = parent;
    var mobile = parent.find(".tel").val();
    var partten = /^1[3-9]\d{9}$/;
    if(!partten.test(mobile)){
      parent.find('.hint').text("请输入正确的手机号码").css('color','red');
      parent.find(".tel").focus();
      return false;
    }
    $.get("http://www.cy177.com/api.php?op=sms&callback=?",{ mobile: mobile,type:'国庆2017',random:Math.random()}, function(data){
      if(data=="0") {
        parent.time = 120;
        parent.find(".getVerify").attr("disabled", true);
        parent.isinerval = setInterval( function () {
          CountDown(parent)
        } , 1000);
      }else if(data=="true") {
        parent.find('.hint').text("你已注册请勿重复").css('color','red');
      }else if(data=="-1") {
        parent.find('.hint').text("你今天获取验证码次数已达到上限").css('color','red');
      }else {
        parent.find('.hint').text("短信发送失败").css('color','red');
      }
    },'jsonp');
  }
  /*验证码禁用*/
  function CountDown(parent) {
    if (parent.time < 1) {
      parent.find(".getVerify").val("获取验证码").attr("disabled", false).css({'cursor':'pointer'});
      clearInterval(parent.isinerval);
      return;
    }
    parent.find(".getVerify").val(parent.time+"秒后重获").css({'cursor':'not-allowed'});
    parent.time--;
  }
  /*验证码是否正确 */
  
    $(".verify").blur(function(){
      var parent = $(this).parents('form');
      /* 验证码为空时不验证 */
      if(parent.find('.verify').val() != '' && parent.find('.verify').val() != '验证码'){
        verify = parent.find(".verify").val();
        mobile= parent.find(".tel").val();
        $.get("http://www.cy177.com/api.php?callback=?",{op:"sms_idcheck",action:"id_code",mobile:mobile,mobile_verify:verify,type:'国庆2017'}, function(data){
          if( data == "1" ) {
            parent.find('.hint').text("验证码正确").css('color','green');
          } else {
            parent.find('.hint').text("验证码不正确").css('color','red');
            return false;
          }
        },'jsonp');
      }
    });

  /*表单提交*/
  
  $(".sub").click(function(){
    var parent = $(this).parents('form');
    verify = parent.find(".verify").val();
    mobile= parent.find(".tel").val();
    username = parent.find(".name").val();
    type = parent.find('.type').val();
    console.log('name: '+username+', mobile: '+mobile+', verify :'+verify+', type :' +type);
    /*点击提交按钮 验证数据*/
    $.get("http://www.cy177.com/index.php?m=ptjd&c=index&a=register&callback=?",{Cname:username,Mobile:mobile,type:type,mobile_verify:verify},function(data){
      if(data == 'success'){
        alert('感谢您的参与！我们将会尽快与您联系！');
      }else if(data == 'true'){
        alert('您已成功参与活动报名，请勿重复提交！');
      }else if(data == 'errorcode'){
        parent.find('.hint').text("验证码输入错误").css('color','red');
      }else if(data == 'errortel'){
        parent.find('.hint').text("手机号码不正确").css('color','red');
      }
    },'jsonp');
    return false;
  })


  $('.tel').on('focus',function () {
		if($(this).attr('value') == '电话'){
			$(this).val('');
		}
	}).on('blur',function () {
		if($(this).val() == ''){
			$(this).attr('value','电话').val('电话');
		}
	}).on('change',function () {
    if($(this).val() != '' && $(this).val != '电话'){
      $(this).attr('value',$(this).val());
    }
  });
	$('.verify').on('focus',function () {
    if($(this).attr('value') == '验证码'){
      $(this).val('');
    }
  }).on('blur',function () {
		if($(this).val() == ''){
		  $(this).val('验证码').val('验证码');
		}
	}).on('change',function () {
    if($(this).val() != '' && $(this).val != '验证码'){
      $(this).attr('value',$(this).val());
    }
  });



})



