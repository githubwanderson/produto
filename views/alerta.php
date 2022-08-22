<!------------------------------    
Usado em:
    Tipo.php 
Variaveis Necessarias:
    $alerta_class  
    $alerta_msg  
-------------------------------->

<div class="container divform" id="div_alert">
    <div class="container-fluid">                
        <div id="conteudo_alert" class="alert alert-<?php echo $alerta_class; ?> text-center mt-2">
            <?php echo $alerta_msg ?>
        </div>  
    </div> 
</div>