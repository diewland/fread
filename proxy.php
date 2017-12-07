<?php
    /*
 
    PHP Proxy for cross-domain ajax
     * http://stackoverflow.com/questions/2558977/ajax-cross-domain-call
     * http://stackoverflow.com/a/697540/466693

    #### how to use ####
     
    function fetch(url){
        $.ajax({
            url: './proxy.php', // this file in same domain
            method: 'POST',
            data: { url: url },
            success: function(resp) {
                console.log(resp);
            }
        })
    }

    */
    $ch=curl_init();
    curl_setopt($ch, CURLOPT_URL, $_POST['url']);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, 'proxyman');
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $query = curl_exec($ch);
    curl_close($ch);
    echo $query;
?>
