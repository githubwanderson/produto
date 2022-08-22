<?php

class Helper 
{
    // ==================================================
    // RECEBE UM ARRAY E DEVOLVE UM ARRAY COM UMA LINHA CAMPO KEY 
    // E UMA LINHA CAMPO VALOR 
    // PARA EFETUAR INSERT NO BANCO DE DADOS

    public function retornOneRow($array)
    {
        $novoArray  = [];
        $key        = false;
        $valor      = false;

        // PEGANDO AS CHAVES E VALORES 
        foreach ($array as $k => $v) 
        {
            if($key)
            {
                $key    = $key.",`".$k."`";
                $valor  = $valor.",'".$v."'";
            }
            else
            {
                $key     = "`".$k."`";
                $valor   = "'".$v."'";
            }
        }

        // CRIANDO STRINGS PARA INSERT
        $novoArray['KEY']   = "(".$key.")";
        $novoArray['VALUE'] = "(".$valor.")"; 

        return $novoArray;
    }

    public function dadosCompra($array)
    {
        $novoArray  = [];
        $key        = false;
        $valor      = false;
        $keyOk      = false;
        $valorOk    = false;
        
        foreach ($array as $k => $v) 
        {
            // Pegar as chaves e valores do array e inserir em novo array
            foreach ($v as $k1 => $v1) 
            {
                // Pego apenas a primeira vez as chaves
                if(!$keyOk)
                {
                    if($key)
                    {
                        $key    = $key.",`".$k1."`";
                    }
                    else            
                    {
                        $key     = "`".$k1."`";
                    }
                }            

                if($valor)
                {
                    $valor  = $valor.",'".$v1."'";
                }
                else            
                {
                    $valor   = "'".$v1."'";
                }
            }

            if($valorOk)
            {
                $novoArray['VALUE'] = $novoArray['VALUE'].",(".$valor.",'".date('Y/m/d H:i:s')."')"; 
            }
            else
            {
                $novoArray['VALUE'] = "(".$valor.",'".date('Y/m/d H:i:s')."')"; 
                $valorOk = true;
            }   
            
            $valor = false;
            $keyOk = true;

            
        }

        // CRIANDO STRINGS PARA INSERT
        $novoArray['KEY']   = "(".$key.",`DT_CADASTRO`)";

        return $novoArray;
    }


}

?>