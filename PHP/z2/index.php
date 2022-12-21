<?php
date_default_timezone_set('Europe/Moscow');
header("Content-type: text/html; charset=UTF-8");
error_reporting(-1);

require_once 'funcs.php';

if (! empty ( $_POST )){
    save_mess();
    header ("Location: {$_SERVER ['PHP_SELF' ]}");
    exit;
}
$messages = get_mess();
$messages = array_mess($messages);
?>
<!doctype html>
<html Lang="en">
<html>
<head>
    <meta charset="UTF-8">
    <title>Гостевая книга</title>
</head>
<body>
<?php if (! empty ($messages)): ?>
    <?php foreach ($messages as $message) : ?>
        <?php $message = get_format_message($message);?>
        <div class= "messages">
            <div style="border-width: 1px; border-style: solid; height: auto; width: 20%; margin-bottom: 10px; word-wrap: break-word;" >
                <div style="float: right; margin-top: 10px; margin-right: 10px"> <?= $message[0] ?></div><div style="margin-top: 10px; margin-left: 10px"><?= $message[2] ?></div><div style=" margin: 15px 10px 14px 10px"><?= $message[1] ?></div></div>
        </div>
    <?php endforeach; ?>
<?php endif ?>
<hr>
<form action="index.php" method="post">
    <p>
        <input type="text" name="name" id="name" placeholder="Имя">
    </p>
    <p>
        <textarea name="text" id="text" style="resize: none; width: 378px; height: 85px" placeholder="Ваше сообщение"></textarea>
    </p>
    <button type="submit" style="margin-left: 105px "> Написать</button>
</form>
</body>
</html>

