<!------------------------------    
Usado em:
    Tipo.php 
Variaveis Necessarias:
    $titulo  
-------------------------------->

<div class="container divform" id="div_cadastro">

    <h4> <?php echo $titulo ?> </h4>
    <hr>

    <form id="id_form" action="" method="post">

        <div class="row">
            <div class='form-group col-md'>
                <label>TIPO</label>                                          
                <select id='ID_TIPO' name='ID_TIPO' class='form-control'></select>
            </div>  
            <div class="col-md">
                <label>DESCRIÇÃO</label>    
                <input type="text" class="form-control" name="DESC" required>
            </div>
        </div>

        <div class="row">
            <div class="col-md">
                <label>VALOR R$</label>    
                <input type="number" class="form-control" name="VALOR" min="0.00" required>
            </div>
            <div class="col-md">
                <label>QUANTIDADE</label>    
                <input type="number" class="form-control" name="QUANTIDADE" min="0" required>
            </div>
        </div>
        <!-- <div class="row">        
            <div class="col-md">
                <label>IMAGEM</label>    
                <input type='file' required accept="image/*" class='form-control' name='IMAGEM'>
            </div>
        </div> -->
        <hr>
        <div class="row">
            <div class="col-md-2 ">   
                <button type="button" class="btn btn-block btn-dark" id="btn_submit">SALVAR</button>            
            </div>
        </div>

    </form>

</div>
