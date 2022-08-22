<?php

$tabela	= $_POST['tipo'][0];
$con	= $_POST['tipo'][1];
$column	= $_POST['tipo'][2];

// Efetuando o select...

include_once '../Query.php';
$result = new Query();
$result = $result->get_tabela($tabela,$column,$con);

echo json_encode($result);
