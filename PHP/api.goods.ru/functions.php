<?php
function getProducts ($connect) {
    $products = mysqli_query($connect, "SELECT * FROM `products`");
    $productsList = [];
    while ($product = mysqli_fetch_assoc($products)) {
        $productsList[] = $product;
    }
    echo json_encode($productsList);
}

function getProduct($connect, $id){
    $product = mysqli_query($connect, "SELECT * FROM `products` WHERE `id` = '$id'");
    if (mysqli_num_rows($product) === 0)
    {
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Товар не найден"
        ];
        echo json_encode($res);
    }
    else
    {
        $product = mysqli_fetch_assoc($product);
        echo json_encode($product);
    }
}

function addProduct($connect, $data){
    $title = $data['title'];
    $description = $data['description'];
    mysqli_query($connect, "INSERT INTO `products` (`id`, `title`, `description`) VALUES (NULL, '$title', '$description')");

    http_response_code(201);

    $res = [
        "status" => true,
        "product_id" => mysqli_insert_id($connect)
    ];

    echo json_encode($res);
}

function updateProduct($connect, $id, $data)
{
    $title = $data['title'];
    $description = $data['description'];
    mysqli_query($connect, "UPDATE `products` SET `title` = '$title', `description` = '$description' WHERE `products`.`id` = '$id'");
    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Товар обновлен"
        ];
    echo json_encode($res);
}

function deleteProduct($connect, $id){
    mysqli_query($connect, "DELETE FROM `products` WHERE `products`.`id` = '$id'");
    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Товар удален"
    ];
    echo json_encode($res);
}