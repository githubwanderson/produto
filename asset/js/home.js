// ============================ Functions

// preenchendo conteudo // caso nao tenha paramentro, pegar todos os tipos

function preenchaConteudo(tipo=null)
{
    $("#div_listaProduto").html('');

    temProduto = false;

    div = String;

    c = 0;

    if(tipo)
    {
        $.each(array_produto, function( i, v ) 
        { 
            if(v.ID_TIPO==tipo)
            {
                if(c==0)
                {
                    div = conteudoHtml(v.ID, v.DESC_TIPO, v.DESC, v.VALOR, v.QUANTIDADE);
                    temProduto = true;
                }
                else
                {
                    div = div + conteudoHtml(v.ID, v.DESC_TIPO, v.DESC, v.VALOR, v.QUANTIDADE);
                }  
            c++;    
            } 
        });
    }
    else
    {
        $.each(array_produto, function( i, v ) 
        { 
            if(c==0)
            {
                div = conteudoHtml(v.ID, v.DESC_TIPO, v.DESC, v.VALOR, v.QUANTIDADE);
                temProduto = true;
            }
            else
            {
                div = div + conteudoHtml(v.ID, v.DESC_TIPO, v.DESC, v.VALOR, v.QUANTIDADE);
            }  
            c++; 
        });
    }

    if(temProduto)
    {        
        $("#div_alert_produto").hide(200);
        $("#div_listaProduto").html(div);
    }
    else
    {
        $("#div_alert_produto").show(200);
    }

}

function conteudoHtml(id, desc_tipo, desc, valor, qtde)
{
    str = '<div class="row">'
            +'<div class="col-sm-2 divformhome item text-center">'
                +'<h4> FOTO </h4>'
            +'</div>'
            +'<div class="col-sm-8 divformhome item text-center">'
                +'<label>' + desc_tipo + ' ' + desc + '</label>'
                +'<br><label> R$' + valor + '</label>'
                +'<br><small> Quantidade: ' + qtde + '</small>'
            +'</div>'
            +'<div class="col-sm-2 divformhome item text-center">'
                +'<button type="button" class="btn btn-block btn-success btn-sm" id='+ id +'><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>'    
            +'</div>'
        +'</div>';
    return str;
}

// ajax get conteudo
function getConteudo(tipo=null)
{
    arr     = [];
    arr[0]  = "produto a JOIN tipo b ON b.ID = a.ID_TIPO";
    arr[1]  = "a.ATIVO = 1";
    arr[2]  = "a.*, b.DESC DESC_TIPO, b.VALOR_IMPOSTO";

    if(tipo) arr[1] =  "a.ATIVO = 1 AND a.ID_TIPO ="+tipo;

    dados   = arr;

    // Verificar se ha registro no banco
    $.ajax(
    {
        url:'database/ajax/select.php',
        type:'post',
        dataType:'json',
        data:{tipo: dados},
        success:(tipo)=>
        {
            if(tipo.length > 0)
            {
                array_produto = tipo;
                preenchaConteudo();
            }
            else
            {                         
                // imprimirAlerta();
                alert('Sem registro');
            }
        },
        error:(e)=>
        {
            console.log(e.status, e.statusText);
        }   
    });
}

// recebe o array_carrinho e preenche o carrinho
function preenchaCarrinho(array)
{
    // if(array) console.log('null')

    $('#tbody').html('');

    tr = false;

    $.each(array, function( i, v ) 
    {
        if(tr)
        {
            tr = tr + "<tr class='id_"+v.ID+"'><th class='add' name='"+v.ID+"'><i class='fa fa-plus-circle btn' aria-hidden='true'></i></th><th rowspan='3'>"+ v.DESC_TIPO + " " + v.DESC +"</th><th rowspan='2' name='id_valor_"+v.ID+"'>R$"+ v.VALOR +" <small>Impostos: R$"+ v.VALOR_IMPOSTO +"</small></th></tr>"
            +"<tr class='id_"+v.ID+"'><th name='id_qtde'>"+ v.QTDE_SELECIONADO +"</th></tr>"
            +"<tr class='id_"+v.ID+"'><th class='ret' name='"+v.ID+"'><i class='fa fa-minus-circle btn' aria-hidden='true'></i></th><th class='del' name='"+v.ID+"'><i class='fa fa-times-circle btn text-danger' aria-hidden='true'></i></th></tr>";
        }
        else
        {
            tr = "<tr class='id_"+v.ID+"'><th class='add' name='"+v.ID+"'><i class='fa fa-plus-circle btn' aria-hidden='true'></i></th><th rowspan='3'>"+ v.DESC_TIPO + " " + v.DESC +"</th><th rowspan='2' name='id_valor_"+v.ID+"'>R$"+ v.VALOR +" <small>Impostos R$"+ v.VALOR_IMPOSTO +"</small></th></tr>"
            +"<tr class='id_"+v.ID+"'><th name='id_qtde'>"+ v.QTDE_SELECIONADO +"</th></tr>"
            +"<tr class='id_"+v.ID+"'><th class='ret' name='"+v.ID+"'><i class='fa fa-minus-circle btn' aria-hidden='true'></i></th><th class='del' name='"+v.ID+"'><i class='fa fa-times-circle btn text-danger' aria-hidden='true'></i></th></tr>";
        }        
    });

    $('#tbody').html(tr);
}

// recebe o array_carrinho e preenche o totalizador
function preechaTotalizador(array)
{
    itens = 0;
    valor = 0;
    imposto = 0;

    $.each(array, function( i, v ) 
    {
        itens   = itens + v.QTDE_SELECIONADO;
        valor   = valor + parseFloat(v.VALOR);
        imposto = imposto   + parseFloat(v.VALOR_IMPOSTO);
    });

    $('#total_item').html(itens);
    $('#total_imposto').html("R$ "+imposto);
    $('#total_valor').html("R$ "+valor);
}

// aumentar qtde item carrinho
function additem(id)
{
    arr = help_item(id);

    if(arr.qtde_carrinho>=arr.qtde_estoque)
    {
        alert('Desculpe, mas não temos essa quantidade em estoque.');
    }
    else
    {
        // add um item e multiplicando valor e valor_imposto pela quantidade de item
        array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO++;
        array_carrinho[arr.key_elemento_carrinho].VALOR = arr.valor_unitario * array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO;
        array_carrinho[arr.key_elemento_carrinho].VALOR_IMPOSTO = arr.valor_uni_imposto * array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO;
        
        // atualizar carrinho
        preenchaCarrinho(array_carrinho)

        // atualizar totalizador
        preechaTotalizador(array_carrinho)
    }   
}

// diminuir a qtde item carrinho
function retitem(id)
{
    arr = help_item(id);

    if(arr.qtde_carrinho<=1)
    {
        alert('Desculpe, mas a quantidade deve ser no minimo 1.');
    }
    else
    {
        // add um item e multiplicando valor e valor_imposto pela quantidade de item
        array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO--;
        array_carrinho[arr.key_elemento_carrinho].VALOR = arr.valor_unitario * array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO;
        array_carrinho[arr.key_elemento_carrinho].VALOR_IMPOSTO = arr.valor_uni_imposto * array_carrinho[arr.key_elemento_carrinho].QTDE_SELECIONADO;
        
        // atualizar carrinho
        preenchaCarrinho(array_carrinho)

        // atualizar totalizador
        preechaTotalizador(array_carrinho)
    }   

}

// help em additem e retitem
function help_item(id)
{
    arr = []
    // verifica se nesse id a qtde em estoque é maior que a qtde solicitada | se sim @alert | se não continua
    $.each(array_produto, function( i, v ) 
    {
        if(id==v.ID)
        {
            arr['qtde_estoque'] =  parseInt(v.QUANTIDADE);    
            arr['valor_unitario'] = parseFloat(v.VALOR); 
            arr['valor_uni_imposto'] = (parseFloat(v.VALOR) * parseFloat(v.VALOR_IMPOSTO))/100; 
        }
    });

    $.each(array_carrinho, function( i, v ) 
    {
        if(id==v.ID)
        {
            arr['qtde_carrinho'] = parseInt(v.QTDE_SELECIONADO);  
            arr['key_elemento_carrinho'] = i;               
            return;
        }
    });

    return arr;
}

// deletar um item
function delitem(id)
{
    $.each(array_carrinho, function( i, v ) 
    {
        if(id==v.ID)
        {
            key_elemento_carrinho = i;       
        }        
    });

    array_carrinho.splice(key_elemento_carrinho,1);

    // se carrinho = 0 então clear
    if(array_carrinho.length==0) 
    {
        array_carrinho = [];
        cont = 0;
        $('#div_alert').show(200);
        $('#ttable,#tbtn').hide(200);
    }

    // atualizar carrinho
    preenchaCarrinho(array_carrinho)

    // atualizar totalizador
    preechaTotalizador(array_carrinho)
}

// getSelect
function getSelectTipo()
{
    arr     = [];
    arr[0]  = "tipo";
    arr[1]  = "ATIVO = 1";
    arr[2]  = "*";
    dados   = arr;

    // Verificar se ha registro no banco
    $.ajax(
    {
        url:'database/ajax/select.php',
        type:'post',
        dataType:'json',
        data:{tipo: dados},
        success:(tipo)=>
        {
            if(tipo.length > 0)
            {
                preenchaSelect('ID_TIPO',tipo);
            }
            else
            {      
                msg = "Não ha produtos cadastrados.";                   
                imprimirAlerta(msg);
            }
        },
        error:(e)=>
        {
            console.log(e.status, e.statusText);
        }   
    });
}

function preenchaSelect(idSelect,array)
{
    document.getElementById(idSelect).innerHTML += '<option value=0>TODOS</option>';

    $.each(array, function( n , v )
    {
        document.getElementById(idSelect).innerHTML += '<option value='+v.ID+'>'+v.DESC+'</option>';
    });
}

// ============================ Document ready

$(document).ready(function() 
{
    // array que armazena os produtos
    array_produto   = [];  
    // array que armazena os itens do carrinho
    array_carrinho  = [];
    // get select
    getSelectTipo();
    // get produtos
    getConteudo();
  
});



// ============================ Ação usuario

// contador do array_carrinho
cont=0;
// onclick add conteudo ao carrinho
$('#div_listaProduto').on('click', 'button', function() 
{
    $('#div_alert').hide(200);
    $('#ttable,#tbtn').show(200);

    id_selecionado = $(this).attr('ID');

    found = false;

    $.each(array_carrinho, function( i, v ) 
    {
        if(id_selecionado==v.ID)
        {
            // se sim chamar a função add_mais_um
            additem(id_selecionado);
            found = true;
        }        
    });

    if(!found)
    {
        $.each(array_produto, function( i, v ) 
        {
            if(id_selecionado==v.ID)
            {
                el = [];
                el['ID'] = v.ID;
                el['DESC_TIPO'] = v.DESC_TIPO;
                el['DESC'] = v.DESC;
                el['QTDE_ESTOQUE'] = v.QUANTIDADE;
                el['VALOR'] = v.VALOR;
                el['VALOR_IMPOSTO'] = v.VALOR_IMPOSTO;
                el['QTDE_SELECIONADO'] = 1;
    
                array_carrinho[cont] = el;
    
                cont++;
            }        
        });
        
        preenchaCarrinho(array_carrinho);  
        
        preechaTotalizador(array_carrinho);
    } 

});

// aumentar qtde item carrinho
$('#tbody').on('click', 'i', function() 
{
    class_selecionada   = $(this).parent().attr('class');
    id_selecionado      = $(this).parent().attr('name');

    if(class_selecionada=="add")
    {
        additem(id_selecionado);
    }
    else if(class_selecionada=="ret")
    {
        retitem(id_selecionado)
    }
    else if(class_selecionada=="del")
    {
        delitem(id_selecionado)
    }

});

$('#finalizarCompra').click(function()
{
    clear_array = [];
    dados       = [];

    $.each(array_carrinho, function( i, v ) 
    { 
        clear_array['ID_PRODUTO'] = v.ID;
        clear_array['QTDE_SELECIONADO'] = v.QTDE_SELECIONADO;
        clear_array['VALOR'] = v.VALOR;
        clear_array['VALOR_IMPOSTO'] = v.VALOR_IMPOSTO;

        dados[i] = Object.assign({},clear_array);
    });  
        
    $.ajax(
    {
        url:'database/ajax/salvarCompra.php',
        type:'post',
        dataType:'json',
        data:{tipo:dados},
        success:(tipo)=>
        {
            if(tipo.length > 0)
            {
                location.reload();     
                alert('Obrigado. sua compra foi registrada.');
            }
            else
            {                         
                // imprimirAlerta();
                alert('Desculpe. Falha ao registrar seu pedido.');
            }
        },
        error:(e)=>
        {
            console.log(e.status, e.statusText);
        }   
    });
});

$("#ID_TIPO").change(function()
{
    v = $(this).val();
    if(v==0)
    {
        preenchaConteudo();
    }
    else
    {
        preenchaConteudo(v);
    }
});
