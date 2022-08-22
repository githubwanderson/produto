<div class="container-fluid">

    <div class="container row divformhome border">

        <!------------------------ Select tipo -->
        <div class="col-sm-4 ">

            <h4> SELECT </h4>
            <div class='form-group col-md'>
                <label>TIPO</label>                                          
                <select id='ID_TIPO' name='ID_TIPO' class='form-control'></select>
            </div>  

        </div>

        <!------------------------ Titulo -->
        <div class="col-sm text-center">

            <h4 class="mt-4"> BEM VINDO! </h4>

        </div>
    </div>

    <div class="container row divformhome item">

        <!------------------------ Lista produtos -->
        <div class="col-md-8 ">

            <div class="container-fluid" id="div_alert_produto">                
                <div id="conteudo_alert" class="alert alert-danger text-center mt-2">
                    No momento estamos sem produtos do tipo selecionado.
                </div>  
            </div> 

            <div class="container" id="div_listaProduto">

            </div> 

        </div>

        <!------------------------ Carrinho -->
        <div class="col-md-4 divformhome item">

            <!------------------------ Itens do carrinho -->
            <div class="container text-center" id="div_itensCarrinho">

                <div class="container-fluid" id="div_alert">                
                    <div id="conteudo_alert" class="alert alert-danger text-center mt-2">
                        <h2><i class="fa fa-shopping-cart" aria-hidden="true"></i></h2>
                        Seu carrinho está vazio.
                    </div>  
                </div> 

                <table class="table table-light table-sm text-center" id="ttable" style="display:none">
                    <thead id="thead">	
                        <tr><th>Quantidade</th><th>Descrição</th><th>Valor</th></tr>	
                    </thead>

                    <tbody id="tbody">	
                    </tbody>

                    <tfoot id="tfoot">
                        <tr><th colspan="2">Total de itens:</th><th id="total_item">0</th></tr>	
                        <tr><th colspan="2">Valor de impostos:</th><th id="total_imposto">0</th></tr>	
                        <tr><th colspan="2">Valor total a pagar:</th><th id="total_valor">0</th></tr>	
                    </tfoot>
                </table>  

                <div class="row" id="tbtn" style="display:none">
                    <div class="col-md-12">   
                        <button type="button" class="btn btn-dark" id="finalizarCompra">FINALIZAR COMPRA</button>
                    </div>
   
                </div> 

            </div>
        </div> 
    </div>
   
</div>

<!-- script -->

<script src="./asset/js/home.js"></script>