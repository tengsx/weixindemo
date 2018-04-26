$(function(){
	$('.baidu-ser').focusin(function(){
		$('.baidu-ser').find('input').css('outline-color','#fff');
	});
	$('.progressbar-text').eq(1).html('2018年计划投资12000亿');	
	$('.pro-tab li').eq(0).click(function(){
		$('.pro-tab li').eq(0).addClass('select-tab');
		$('.pro-tab li').eq(1).removeClass('select-tab');
		$('#tab-new').css('display','block');
		$('#tab-now').css('display','none');
	});
	$('.pro-tab li').eq(1).click(function(){
		$('.pro-tab li').eq(1).addClass('select-tab');
		$('.pro-tab li').eq(0).removeClass('select-tab');
		$('#tab-now').css('display','block');
		$('#tab-new').css('display','none');
	});

});
