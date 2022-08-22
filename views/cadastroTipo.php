<!------------------------------    
Usado em:
    Tipo.php 
Variaveis Necessarias:
    $titulo  
-------------------------------->

<div class="container divform">

    <h4> <?php echo $titulo ?> </h4>
    <hr>

    <form id="id_form" action="" method="post">

        <div class="row">
            <div class="col-md">
                <label>DESCRIÇÃO</label>
                <input type="text" class="form-control" name="DESC" required>
            </div>
            <div class="col-md">
                <label>VALOR IMPOSTO %</label>
                <input type="number" class="form-control" min="0" max="100" placeholder="Digite um valor entre 0 e 100" name="VALOR_IMPOSTO" required>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-2">   
                <button type="button" class="btn btn-block btn-dark" id="btn_submit">SALVAR</button>            
            </div>
        </div>

    </form>

</div>
