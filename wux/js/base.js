var $ = jQuery.noConflict();

$wuxwp = $('#wux-waitpls');
if(!this.$wuxwp.length) {
  $('<div id="wux-waitpls" class="waitpls"></div>').appendTo('body');
}

$(document).on({
ajaxStart:function(){$("body").addClass("loading");},
ajaxStop:function(){$("body").removeClass("loading");}
});