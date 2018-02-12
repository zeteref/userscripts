// ==UserScript==
// @name         wykop cleaner
// @namespace    https://github.com/zeteref/userscripts
// @version      0.3.3
// @description  try to take over the world!
// @author       Me
// @include *://*wykop.pl*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        var src = $('.screen > div').attr('id').replace('yt-','');
        var yt = '<iframe width="100%" height="648" src="https://www.youtube.com/embed/'+src+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        
        $('.screening-displace').remove();
        $('#animation_container').remove();
        $('#fb-root').remove();
        $('[href*="adverts"]').remove();
        $('.screen').replaceWith(yt);

    });

    // Your code here...
})();
