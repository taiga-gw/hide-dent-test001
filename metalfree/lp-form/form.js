'use strict';
$(function(){
  /*
   注文フォーム
  ----------------------------*/
  $.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
  var today = new Date();
  if ($('.datepicker').length) {
    $.get('./lp-form/holidays.csv',function(csv){
      $('body').append('<input type="hidden" name="holidays" value="'+csv.replace(/\n/g, ',')+'">');
    });
  }
  $('.datepicker').datepicker({
    minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    //maxDate: '+1M', //月後までが選択可能範囲

    // minDate: new Date(2024, 12 - 1, 28),
    // maxDate: new Date(2024, 12 - 1, 28),
    beforeShowDay: function(date){
      var w = date.getDay();
      var holdays = $('[name="holidays"]').val();
      var this_date = dateFormat(date);

      // 日曜 は 選択不可
      if (w == 0) return false;

      // 祝日設定
      if (holdays.indexOf(this_date) !== -1) return false;

      return [true, ''];
    }
  });
  $('.datepicker').each(function(){
    if ($(this).val() == '0') $(this).val('');
  });

  function dateFormat(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    // var w = date.getDay();
    // var wNames = ['日', '月', '火', '水', '木', '金', '土'];
    m = ('0' + m).slice(-2);
    d = ('0' + d).slice(-2);
    return y + '-' + m + '-' + d;
  }
});

$(function(){
	var nowchecked;
	$('input').mouseover(function(){
		nowchecked = $('input:checked').val();
		console.log(nowchecked);
	});
	$('input').click(function(){
		if($(this).val() == nowchecked) {
			$(this).prop('checked', false);
			nowchecked = false;
		} else {
			nowchecked = $(this).val();
		}
	});
});