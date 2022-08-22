<?php

date_default_timezone_set('America/Sao_Paulo');

include_once "ConexaoBD.php";

class Query extends ConexaoBD
{    
    // con deve receber uma string com "coluna condicao valor" 
    // exemplo: con = "ATIVO = 1"
    public function get_tabela($tabela,$column,$con=null)
    {
        $pdo    = $this->conectar();

        if($con)
        {
            $sql = "SELECT $column FROM $tabela WHERE $con";
        }
        else
        {
            $sql = "SELECT $column FROM $tabela";
        }

        $result = $pdo->query($sql);

        $result = $result->fetchAll( PDO::FETCH_ASSOC );

        return $result;       
    }

    public function insert($tabela,$key,$value)
    {   
        $pdo    = $this->conectar();
        $sql    = "INSERT INTO $tabela $key VALUES $value";
        $r      = $pdo->query($sql);
        $r      = $pdo->lastInsertId();
        return $r;       
    }

    public function update($tabela,$dados,$where)
    {   
        $pdo    = $this->conectar();
        $sql    = "UPDATE $tabela SET $dados WHERE $where";
        $r      = $pdo->query($sql);
        return $r;       
    }
    

    public function queryUser($sql)
    {   
        $pdo    = $this->conectar();
        $result      = $pdo->query($sql);
        $result = $result->fetchAll();
        return $result;       
    }

    public function select($sql,$p=null)
    {   
        $pdo    = $this->conectar();
        $r      = $pdo->query($sql);
        if($p)
        {
            $result = $r->fetchAll();
        }
        else
        {
            $result = $r->fetch();
        }
        return $result;       
    }



}


?>