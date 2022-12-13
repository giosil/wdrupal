var $ = jQuery.noConflict();

let $wuxwp = $('#wux-waitpls');
if(!$wuxwp.length) {
  $('<div id="wux-waitpls" class="waitpls"></div>').appendTo('body');
}

$(document).on({
ajaxStart:function(){$("body").addClass("loading");},
ajaxStop:function(){$("body").removeClass("loading");}
});