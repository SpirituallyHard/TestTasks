<?php
date_default_timezone_set('Europe/Moscow');
$count = file_get_contents(__DIR__ . '/count.txt');
$count = $count + 1;
echo 'Страница была загружена ', $count, ' раз. Текущее время ', date('H:i');
file_put_contents(__DIR__ . '/count.txt', $count);
