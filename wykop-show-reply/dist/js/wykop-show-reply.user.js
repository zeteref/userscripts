
(function(ns, $, undefined) {
    var privateVariable = 'privateValue';


    function parse_comment(cmt) {
        return {
            data_id: cmt.attr('data-id'),
            author: cmt.find('.author a.showProfileSummary').first().text(),
            text: cmt.find('div.text').first(),
            replies: cmt.find('div.text a.showProfileSummary'),
            dom: cmt
        };
    }

    function find_previous_comment(stop_id, replied_to) {
          
        tmp = undefined;
        ret = undefined;

            stop = false;
            $('[data-type="comment"]').each(function() {
                if(!stop) {
                    var cmt = parse_comment($(this));
                    
                    if(cmt.data_id == stop_id) {
                        ret = tmp;
                        stop = true;
                    }
                    if (cmt.author == replied_to) {
                        tmp = cmt;
                    }
                }

            });
          
        return ret;
          
    }

    function add_listeners() {
        $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">');
        $('body').append('<div id="mypopup"></div>');
        
        $('[data-type="comment"]').each(function() {
          var cmt = parse_comment($(this));
          if (cmt.replies.length > 0) {
              cmt.replies.each(function() {
                  $(this).mouseenter(function() {
                     
                    
                    var prevcmt = find_previous_comment(cmt.data_id, $(this).text());
                    
                    $('#mypopup').empty();
                    $('#mypopup').append(prevcmt.dom.clone());
                    
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
    }

    ns.init = function() {
        add_listeners();
    }


})(window.utils = window.utils || {}, jQuery, undefined);
