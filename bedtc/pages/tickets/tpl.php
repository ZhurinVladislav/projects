<?php

    if(!$_GET['ticket_id']){
        $template = require_once './pages/tickets/tpl_all.php';
    } else {
        $template = require_once './pages/tickets/tpl_item.php';
    }
 
?>


            