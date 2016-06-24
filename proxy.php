<?php
    // http://stackoverflow.com/questions/2558977/ajax-cross-domain-call
    // http://stackoverflow.com/a/697540/466693
    $curl_handle=curl_init();
    curl_setopt($curl_handle, CURLOPT_URL, $_POST['url']);
    curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
    curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl_handle, CURLOPT_USERAGENT, 'proxy001');
    $query = curl_exec($curl_handle);
    curl_close($curl_handle);
    echo $query;
?>
