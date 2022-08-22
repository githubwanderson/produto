<?php

	// adiciono a data atual para cadastro
	$_POST['DT_CADASTRO'] = date('Y/m/d H:i:s');
	
	// recupero o nome do banco e dead no elemento BD
	$bd_name = $_POST['BD']; unset($_POST['BD']);

	// retornOneRow devolve uma string com os labels e um com os valores
	include_once '../../helper/Helper.php';
	$dados  = new Helper();
	$dados  = $dados->retornOneRow($_POST);
	$key    = $dados['KEY'];
	$value  = $dados['VALUE'];

	// inserindo ao banco
	include_once '../Query.php';
	$bd     = new Query();
	$result = $bd->insert($bd_name, $key, $value);

	echo json_encode($result);