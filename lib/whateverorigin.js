function whatever_fetch(url, src_name, callback){
    var proxy_url = './proxy.php'; // TODO config your proxy file
    $.ajax({
        url: proxy_url,
        method: 'POST',
        data: {
            url: url
        },
        success: function(resp) {
            callback(src_name, resp);
        }
    })
}
