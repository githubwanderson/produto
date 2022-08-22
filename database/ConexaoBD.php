<?php

abstract class ConexaoBD
{        
    // ==================================================
    // Dados de conexão com Banco de Dados

    private $dsn        = 'mysql:host=localhost;dbname=bd_produto';
    private $user       = 'root';
    private $password   = '';
    
    // ==================================================
    // conectando

    public function conectar()
    {         
        try 
        {
            $pdo = new PDO($this->dsn,$this->user,$this->password);
        } 
        catch (PDOException $e) 
        {
            echo "Erro conexao: ".$e->getMessage;
        }
        catch (Exception $e) 
        {
            echo "Erro: ".$e->getMessage;
        }

        return $pdo;
        // var_dump($pdo);
    }



    // ==================================================
    // desconectando

    // public function desconectar($mysql)
    // {         
    //     $mysql->close() == false ? "NÃO HA CONEXÃO ABERTA COM O BANCO DE DADOS." : "conexao fechada" ;    
    // }
    
}
?>