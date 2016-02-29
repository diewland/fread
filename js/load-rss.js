// require js/whateverorigin.js

var data = [];
var left_sources = sources.length;

$('#fread').html('<br />');

for( i in sources){
    var src = sources[i];
    whatever_fetch(src['url'], src['name'], function(src_name, resp_text){

        $('#fread').append('&nbsp; &nbsp;=> Fetching from ' + src_name + '..</br>');

        var xmlDoc = $.parseXML( resp_text );
        var $xml = $( xmlDoc );

        var items = $xml.find( 'item' );  // (default) blognone, droidsans
        if(items.length == 0){
            items = $xml.find( 'entry' ); // the verge
        }
        for(var i=0; i<=items.length; i++){
            var item = items[i];

            // console.log(item); // TODO

            // ( default ) blognone, droidsans
            var title = $(item).find('title').first().text();
            var pub_date =  $(item).find('pubDate').text();
            var desc = $(item).find('description').text();
            var link = $(item).find('link').text();
            var owner = $(item).find('creator').first().text();
            if(!desc){ // theverge
                pub_date = $(item).find('published').text();
                desc = $(item).find('content').text();
                link = $(item).find('link').attr('href');
            }
            if(title){
                data.push({
                    src:        src_name,
                    title:      title,
                    pub_date:   new Date(pub_date),
                    desc:       desc,
                    link:       link,
                    owner:      owner == '' ? '' : 'by ' + owner,
                })
            }
        }

        // load all source ?
        left_sources--;
        if(left_sources == 0){

            x = data; // TODO

            // sort data by publish date
            data.sort(function(a, b){
                return a['pub_date'] - b['pub_date'];
            });

            // write data to screen
            $('#fread').html('');
            for(i in data){
                var d = data[i];
                var row = "<div class='item' ref='" + (data.length-i-1) + "'>"
                            + "<div class='bar row'>"
                                + "<div class='col-md-9'>" + d['src'] + " - " + d['title'] + "</div>"
                                + "<div class='col-md-3 ts'>" + d['pub_date'].toLocaleString() + "</div>"
                            + "</div>"
                            + "<div class='content'>"
                                + "<div class='owner'>" + d['owner'] + "</div>"
                                + d['desc']
                                + "<div class='link'>" + d['link'] + "</div>"
                            + "</div>"
                        + "</div>";
                $('#fread').prepend(row)
            }

            // bind mouse events
            $('.item').on('click', function(){
                $('.item').removeClass('active');
                $(this).addClass('active');
                $('.item .content').slideUp();
                $(this).find('.content').slideToggle();
                CURSOR = parseInt($(this).attr('ref'));
            })
        }
    });
}
