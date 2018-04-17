// ==UserScript==
// @name wykop-show-reply
// @version 0.1.2
// @namespace Violentmonkey Scripts
// @include  *://*wykop.pl*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @grant none
// ==/UserScript==



(function() {
    
function find_previous_comment(id, author) {
  
  tmp = undefined;
  ret = undefined;
  $('[data-type="comment"]').each(function(cmt) {
      
      if($(this).attr('data-id') == id) {
        ret = tmp;
      }
      if ($(this).find('.author a').first().text() == author) {
         tmp = $(this);   
      }
  });
  
  return ret;
  
}


function find_conversation(id, auhor, replier) {
  tmp = undefined;
  ret = $(<'div></div>');
  
  $('[data-type="comment"]').each(function() {
   if($(this).attr('data-id') == id) {
        ret = tmp;
      }  
  });
  
  return ret;
}
  
$(document).ready(function() {

    $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">');
    $('body').append('<div id="mypopup"></div>');
    
    $('[data-type="comment"]').each(function(cmt) {
      var data_id = $(this).attr('data-id');
      var author = $(this).find('.author a').first().text();
      var text = $(this).find('div.text').first();
      var replies = $(this).find('div.text a.showProfileSummary')
      if (replies.length > 0) {
          replies.each(function() {
              $(this).mouseenter(function() {
                 
                
                var prevcmt = find_previous_comment(data_id, $(this).text());
                
                $('#mypopup').empty();
                $('#mypopup').append(prevcmt.clone());
                
                $('#mypopup').dialog({
                  dialogClass: 'no-close', 
                  draggable: false, 
                  minWidth: 500
                });
                $('.ui-dialog-titlebar').css({display: 'none'});
                $( ".ui-dialog" ).position({
                  my: "left bottom",
                  at: "right",
                  of: $(this)
                });
                
              });
          });
      }
      $( "#mypopup" ).on( "mouseleave", function( event, ui ) { $('#mypopup').dialog('close'); } );
      
      
      
    });

});

})();


