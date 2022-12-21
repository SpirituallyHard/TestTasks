<?php

function save_mess()
{
    if ($_POST['name'] === '' && $_POST['text'] !== '')
    {
        $str = "Анонимно" . '|' . $_POST['text'] . '|' . date('d.m.Y H:i') . "\n***\n";
        file_put_contents('gb.csv', $str, FILE_APPEND);
    }
    if($_POST['name'] !== '' && $_POST['text'] === '') {}
    if($_POST['name'] && $_POST['text'])
    {
        $str = $_POST['name'] . '|' . $_POST['text'] . '|' . date('d.m.Y H:i') . "\n***\n";
        file_put_contents('gb.csv', $str, FILE_APPEND);
    }
}

function get_mess(){
    return file_get_contents( 'gb.csv' );
}

function array_mess($messages){
    $messages = explode("\n***\n", $messages);
    array_pop($messages);
    // return array_reverse($messages);
    return($messages);
}

function get_format_message($message){
    return explode('|', $message);
}

function print_arr($arr){
    echo '<pre>' . print_r($arr, true) . '</pre>';
}
