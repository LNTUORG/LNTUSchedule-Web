/*
 * jQuery Plugin : jConfirmAction
 * 
 * by Hidayat Sagita
 * http://www.webstuffshare.com
 * Licensed Under GPL version 2 license.
 *
 */
(function($){

	jQuery.fn.jConfirmAction = function (options) {
		
		// Some jConfirmAction options (limited to customize language) :
		// question : a text for your question.
		// yesAnswer : a text for Yes answer.
		// cancelAnswer : a text for Cancel/No answer.
		var theOptions = jQuery.extend ({
			question: "你确定要删除吗 ?",
			yesAnswer: "是",
			cancelAnswer: "否"
		}, options);
		
		return this.each (function () {
			$(this).bind('click', function(e) {
				e.preventDefault();
				thisHref	= $(this).attr('href');
				
				if($(this).next('.question').length <= 0)
					$(this).after('<div class="question">'+theOptions.question+'<br/> <span class="yes">'+theOptions.yesAnswer+'</span><span class="cancel">'+theOptions.cancelAnswer+'</span></div>');
				$(this).next('.question').animate({opacity: 1}, 300);
				
				$('.yes').bind('click', function(){
                    if(flag == "2"){
                        var data={"class_name":$(this).parent().parent().prevAll().eq(0).text()};

                        $.ajax({
                            type: "delete",
                            url: "https://api.schedule.lntu.org/room/v1/lntu-useless-class",
                            data:data,
                            dataType: 'json',
                            success: function () {
                                alert("删除成功！");
                                history.go(0);
                            },
                            error:function(a){
                                if(a.status == 401){
                                    location.href="../html/login.html"
                                }
                                else{
                                    alert("服务器出现错误，请与管理员联系！");
                                    $(".spinner").css("display","none");
                                }
                            }
                        });
                    }if(flag =="1"){
                        var data={
                            "location_id":$(this).parent().parent().prevAll().eq(8).text(),
                            "building_id":$(this).parent().parent().prevAll().eq(6).text()
                        };
                        console.log(data)
                        $.ajax({
                            type: "delete",
                            url: "https://api.schedule.lntu.org/room/v1/lntu-building",
                            data:data,
                            dataType: 'json',
                            success: function () {
                                alert("删除成功！");
                                history.go(0);
                            },
                            error:function(a){
                                if(a.status == 401){
                                    location.href="../html/login.html"
                                }
                                else{
                                    alert("服务器出现错误，请与管理员联系！");
                                    $(".spinner").css("display","none");
                                }
                            }
                        });
                    }

                    $(this).parents('.question').fadeOut(300, function() {
                        $(this).remove();
                    });
				});
		
				$('.cancel').bind('click', function(){
					$(this).parents('.question').fadeOut(300, function() {
						$(this).remove();
					});
				});
				
			});
			
		});
	}
	
})(jQuery);
//zs
function manage(tag){
    $(".xq-id").val($(tag).parent().parent().prevAll().eq(2).text());
    $(".jxl-id").val($(tag).parent().parent().prevAll().eq(1).text());
    $(".js-name").val($(tag).parent().parent().prevAll().eq(0).text());
    $(".shadow").css("display","block");
}

function checkFormat(tel){
   /* if( isNaN(tel))
    {
        return false;
    }
    else if(tel.length!=11)
    {
        return false;
    }

    else{
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(tel))
        {
            return false;
        }
        else{
            return true;
        }
    }*/
    return true

}