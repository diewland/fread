// require js/whateverorigin.js

var DATA = [];
var left_sources = sources.length;

$('#fread').html('<br />');

for( i in sources){
    (function(src){
        whatever_fetch(src['url'], src['name'], function(src_name, resp_text){
            try {
                var xmlDoc = $.parseXML( resp_text );
                var $xml = $( xmlDoc );
                $('#fread').append('&nbsp; &nbsp;=> Fetching from ' + src_name + '..</br>');

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
                        DATA.push({
                            src:        src_name,
                            title:      title,
                            pub_date:   new Date(pub_date),
                            desc:       desc,
                            link:       link,
                            owner:      owner == '' ? '' : 'by ' + owner,
                            css:        src.css,
                        })
                    }
                }
            }
            catch(err){
                console.log(src, err);
            }

            // load all source ?
            left_sources--;
            if(left_sources == 0){
                render_feed(DATA);
            }
        });
    })(sources[i]);
}

function render_feed(cur_data, filter){

    if((filter)&&(filter != '')){
        filter = filter.toLowerCase();
        cur_data = cur_data.filter(function(o){
            return ( o['title'].toLowerCase().indexOf(filter) > 0 ) ||
                   ( o['desc'].toLowerCase().indexOf(filter) > 0 );
        });
    }

    // sort data by publish date
    cur_data.sort(function(a, b){
        return a['pub_date'] - b['pub_date'];
    });

    // write cur_data to screen
    $('#fread').html('');
    for(i in cur_data){
        var d = cur_data[i];
        var css = d.css;
        var row = "<div class='item' ref='" + (cur_data.length-i-1) + "' style='" + css + "'>"
                    + "<div class='bar row'>"
                        + "<div class='col-md-9'>" + d['src'] + " - " + d['title'] + "</div>"
                        + "<div class='col-md-3 ts'>" + d['pub_date'].toLocaleString() + "</div>"
                    + "</div>"
                    + "<div class='content'>"
                        + "<div class='owner'>" + d['owner'] + "</div>"
                        + d['desc']
                        + "<div><a class='link' href='" + d['link'] + "' target='_blank'>" + d['link'] + "</a></div>"
                    + "</div>"
                + "</div>";
        row = $.parseHTML(row); // safe html text
        $('#fread').prepend(row);
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
