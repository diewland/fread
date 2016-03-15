var CURSOR_MODE = true; // true - cursor mode
                        // false - search mode

var CURSOR = 0;
var KEY_ETR = 13;
var KEY_DOT = 46;
var KEY_SLSH = 47;
var KEY_QUES = 63;  // ? ( shift + / )
var KEY_G = 71;     // G ( shift + g )
var KEY_J = 106;
var KEY_K = 107;
var KEY_L = 108;
var KEY_O = 111;
var KEY_P = 112;
var KEY_R = 114;

var CODE_ESC = 27;

function enable_search_mode(){
    CURSOR_MODE = false;
    $('#search').show(0, function(){
        $(this).focus();
    });
}

function enable_cursor_mode(){
    CURSOR_MODE = true;
    CURSOR = 0;
    if($('#search').val() != ''){
        // search something, don't hide search box
        $('#search').blur();
        $('.item').removeClass('active');
        $('.item').eq(CURSOR).addClass('active');
    }
    else {
        // search is blank, hide search box
        $('#search').hide(0, function(){
            $('.item').removeClass('active');
            $('.item').eq(CURSOR).addClass('active');
        });
    }
}

$('#search').keyup(function(evt){
    // render fread from q
    var q = $(this).val().replace(/\//g, '');
    if(evt.keyCode == CODE_ESC){
        q = ''; // if press ESC, clear textbox
    }
    $(this).val(q);
    render_feed(DATA, q);

    // if press ESC, switch to cursor mode
    if(evt.keyCode == CODE_ESC){
        enable_cursor_mode();
    }
});

$('body').keypress(function(evt){
    // console.log(evt.which);
    // console.log(evt.keyCode);

    // switch cursor/search mode
    if(evt.which == KEY_SLSH){
        if(CURSOR_MODE){
            enable_search_mode();
        }
        else {
            enable_cursor_mode();
        }
    }
    if(!CURSOR_MODE){
        return;
    }

    if(evt.which == KEY_ETR){ // toggle
        $('.item .content').slideUp();
        $('.item .content').eq(CURSOR).slideToggle()
    }
    else if(evt.which == KEY_J){ // down
        if(CURSOR < $('.item').length-1){ CURSOR += 1; }
    }
    else if(evt.which == KEY_K){ // up
        if(CURSOR > 0){ CURSOR -= 1; }
    }
    else if(evt.which == KEY_R){ // refresh
        location.href = 'index.html';
    }
    else if(evt.which == KEY_DOT){ // top
        CURSOR = 0;
        $('.item .content').slideUp();
        window.scrollTo(0, 0, { behavior: 'smooth' });
    }
    else if(evt.which == KEY_G){ // bottom
        CURSOR = $('.item').length - 1;
        $('.item .content').slideUp();
        window.scrollTo(0, $('.item').last().offset().top, { behavior: 'smooth' })
    }
    else if(evt.which == KEY_L){ // collapse
        $('.item .content').slideUp();
    }
    else if(evt.which == KEY_O){ // open link window
        window.open($('.item.active .link').html());
    }
    else if(evt.which == KEY_P){ // share g+
        var url = 'https://plus.google.com/share?url=' + $('.item.active .link').html();
        window.open(url, 'gplus', "height=500,width=500,left=600,top=200");
    }
    else if(evt.which == KEY_QUES){ // help
        var msg = ''
                + '=== ITEM ===\n'
                + '\n'
                + 'ENTER - Expand item\n'
                + 'L - Collapse item\n'
                + '\n'
                + '=== CURSOR ===\n'
                + '\n'
                + 'K - Move Up\n'
                + 'J - Move Down\n'
                + '. - Move Top\n'
                + 'SHIFT+G - Move Bottom\n'
                + '\n'
                + '=== SEARCH ===\n'
                + '\n'
                + '/ - Toggle Search/Cursor mode\n'
                + 'Esc - Exist Search mode\n'
                + '\n'
                + '=== OTHER ===\n'
                + '\n'
                + 'R - Refresh fread\n'
                + 'O - Open in new window\n'
                + 'P - Share to Google+\n'
                ;
        alert(msg);
    }

    // update cursor
    $('.item').removeClass('active');
    $('.item').eq(CURSOR).addClass('active');

    // handle scroll
    var win_height = window.innerHeight;
    var abs_offset = $('.item.active').offset().top;
    var rel_offset = abs_offset - window.scrollY;
    //
    // console.log( win_height, rel_offset, abs_offset);
    //
    if((evt.which == KEY_J)&&(rel_offset + 100 > win_height)){ // close to end
        console.log('down', abs_offset, abs_offset-50, 'x');
        window.scrollTo(0, abs_offset - 50, { behavior: 'smooth' });
    }
    else if((evt.which == KEY_K)&&(rel_offset < 50)){ // close to top
        console.log('up', abs_offset, win_height, abs_offset - (win_height/2), 'x');
        window.scrollTo(0, abs_offset - (win_height/2), { behavior: 'smooth' });
    }
});
