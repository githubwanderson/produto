<?php

	include_once '../Query.php';
	include_once '../../helper/Helper.php';

	$result = $_POST['tipo'];
	
	$bd_name = 'vendas';

	// Validar a quantidade em estoque e atualizar o mesmo um a um
	// consulto o id e trago a quantidade
	foreach ($result as $k => $v) 
	{
		$r = $v['ID_PRODUTO'];
		$consulta = new Query();
		$consulta = $consulta->get_tabela('produto','ID,QUANTIDADE','ID = '.$v['ID_PRODUTO']);
		$valorConsulta = $consulta[0]["QUANTIDADE"];
		// Se qtde em estoque for maior que qtde selecionada entao ok // Se não, não salvar e informar ao usuario
		if($valorConsulta>$v['QTDE_SELECIONADO'])
		{
			$novaQtde = $valorConsulta-$v['QTDE_SELECIONADO'];
			$novaQtde = "QUANTIDADE = ".$novaQtde;
			$where	  = "ID = ".$v['ID_PRODUTO'];
			$atualiza = new Query();
			$atualiza = $atualiza->update('produto',$novaQtde,$where);
		}
		else
		{
			// Salvar id e passar para dadosCompra retira-lo dos dados vendas a serem salvos 
		}		
	}

	// retornOneRow devolve uma string com os labels e um com os valores
	$dados  = new Helper();
	$dados  = $dados->dadosCompra($result);
	$key    = $dados['KEY'];
	$value  = $dados['VALUE'];

	// inserindo ao banco
	$bd     = new Query();
	$result = $bd->insert($bd_name, $key, $value);

	echo json_encode($consulta);