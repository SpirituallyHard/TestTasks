<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');

require 'connect.php';
/** @var $connect */
require 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1];

switch ($method)
{
    case ('GET'):
        if ($type === 'products')
        {
            if (isset($id)) {
                getProduct($connect, $id);
            }
            else
            {
                getProducts($connect);
            }
        }
        break;
    case ('POST'):
        if ($type === 'products'){
            addProduct($connect, $_POST);
        }
        break;
    case ('PUT'):
        if ($type === 'products')
        {
            if (isset($id)){
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                updateProduct($connect, $id, $data);
            }
        }
        break;
    case ('DELETE'):
        if ($type === 'products')
        {
            if (isset($id)){
                deleteProduct($connect, $id);
            }
        }
}