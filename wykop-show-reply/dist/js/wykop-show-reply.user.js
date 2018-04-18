// ==UserScript==
// @name         wykop conversation
// @namespace    https://github.com/zeteref/userscripts
// @version      0.3.3
// @description  try to take over the world!
// @author       Me
// @include      *://*wykop.pl*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// ==/UserScript==


(function(ns, $, undefined) {
    var privateVariable = 'privateValue';


    function parse_comment(cmt) {
        var repliers_names = cmt.find('div.text a.showProfileSummary').map(function() {
            return $(this).text();
        });

        var ret = {
            data_id: cmt.attr('data-id'),
            author: cmt.find('.author a.showProfileSummary').first().text(),
            text: cmt.find('div.text').first(),
            replies: cmt.find('div.text a.showProfileSummary').map(function() { return $(this).text(); }),
            replies_dom: cmt.find('div.text a.showProfileSummary'),
            dom: cmt
        };

        return ret;
    }

    function find_previous_comment(stop_id, current_by, reply_to) {

        ret = undefined;
        
        non_reply = undefined;
        reply_to_other = undefined;
        reply_to_current = undefined;
        stop = false;
      
        $('[data-type="comment"]').each(function() {
            if(!stop) {
                var cmt = parse_comment($(this));

                if(cmt.data_id == stop_id) {
                      if(reply_to_current != undefined) {
                        ret = reply_to_current;
                      }
                      else if(non_reply != undefined) {
                        ret = non_reply;
                      }
                      else {

                        ret = reply_to_other;
                      }
                    stop = true;

                }
                
                if (cmt.author == reply_to) { 
                    if(cmt.replies.length == 0) {
                      non_reply = cmt;
                    }
                    else if($.inArray(current_by, cmt.replies) != -1)  {
                        reply_to_current = cmt;
                    }
                    else {
                        reply_to_other = cmt;
                    }
                    
                }
            }

        });

        return ret;

    }

    function find_conversation(first, second) {
       
        var tmp = $('.comments-stream [data-type="comment"]').map(function() {
            return parse_comment($(this));                                  
        }).filter(function(idx, cmt) {
            if(cmt.author == first && $.inArray(second, cmt.replies) != -1) {
                return cmt;
              
            }
            else if(cmt.author == second && $.inArray(first, cmt.replies) != -1) {
                return cmt;
            }
        });
          
        var first_reply = tmp[0];
        var current_by = first_reply.author;
        var first_comment = find_previous_comment(first_reply.data_id, current_by, first_reply.author == first ? second : first);

        var ret = $('<div></div>');
        if(first_comment != undefined) {
            
            ret.append(first_comment.dom.clone());
        }
        for(var i = 0; i < tmp.length; i++) {
            ret.append(tmp[i].dom.clone());
        }

        return ret;
    }


    function add_listeners() {
        $('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">');
        $('body').append('<div id="mypopup"></div>');

        $('[data-type="comment"]').each(function() {
            var cmt = parse_comment($(this));
            if (cmt.replies_dom.length > 0) {
                cmt.replies_dom.each(function() {
                    $(this).mouseenter(function() {

                        //var prevcmt = find_previous_comment(cmt.data_id, $(this).text());
                        var con = find_conversation($(this).text(), cmt.author);

                        $('#mypopup').empty();
                        $('#mypopup').append(con);

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

utils.init();
