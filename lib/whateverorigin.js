// http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax/17299796#17299796

function whatever_fetch(url, src_name, callback){
    // It is good specify the charset you expect.
    // You can use the charset you want instead of utf-8.
    // See details for scriptCharset and contentType options: 
    // http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
    $.ajaxSetup({
        scriptCharset: "utf-8", //maybe "ISO-8859-1"
        contentType: "application/json; charset=utf-8"
    });

    $.getJSON('http://whateverorigin.org/get?url=' + 
        encodeURIComponent(url) + '&callback=?',
        function(data) { callback(src_name, data.contents); });
}
