// ==UserScript==
// @name         wykop cleaner
// @namespace    https://github.com/zeteref/userscripts
// @version      0.3
// @description  try to take over the world!
// @author       Me
// @include *://*wykop.pl*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

	$(document).ready(function() {
        $('.screening-displace').remove();
        $('#animation_container').remove();
        $('#fb-root').remove();
        $('[href*="adverts"]').remove();
	});

    // Your code here...
})();

