// ============================ Functions

function getTabela()
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
                preenchaTabela(tipo);
            }
            else
            {                         
                imprimirAlerta();
            }
        },
        error:(e)=>
        {
            console.log(e.status, e.statusText);
        }   
    });

}

function preenchaTabela(dados)
{
    $('#div_alert').hide();
    $('#div_tabela').show();
    $('#tbody').html('');

    line = 0
    body = false;
    $.each(dados, function(i,v)
    {           
        link_id = "<a id="+v.ID+" class='btn_edit text-dark'><i class='fa fa-edit' aria-hidden='true'></i></a>";

        if(line=0)
        {
            line = '<tr><td>'+v.ID+'</td>'+'<td>'+v.DESC+'</td>'+'<td>'+v.VALOR_IMPOSTO+'</td>'+'<td>'+link_id+'</td>';    
            line + '</tr>';  
        }
        else
        {
            line = line + '<tr><td>'+v.ID+'</td>'+'<td>'+v.DESC+'</td>'+'<td>'+v.VALOR_IMPOSTO+'</td>'+'<td>'+link_id+'</td>';    
            line + '</tr>';  
        }  
        body = body == false ? line : body + line;
    });   
        
    $('#tbody').html(body);

}

function imprimirAlerta()
{
    $('#div_alert').show();
    $('#div_tabela').hide();
}

// ============================ Ação usuario

$('#btn_submit').click(function()
{
    if($('input[name=DESC]').val()=='' || $('input[name=VALOR_IMPOSTO]').val()=='' || $('input[name=VALOR_IMPOSTO]').val()>100 || $('input[name=VALOR_IMPOSTO]').val()<0)
    {
        alert('Digite um valor válido.')
    }
    else
    {   
        dados = $('#id_form').serialize();
        dados = dados + "&BD=tipo";
        
        $.ajax(
        {
            url:'database/ajax/salvar.php',
            type:'post',
            dataType:'json',
            data:dados,
            success:(dados)=>
            {
                if(dados.length > 0 && dados != 0)
                {
                    alert('Registro ID:'+dados+' salvo com sucesso.');   
                    $('#id_form input').val('');
                    getTabela();
                }
                else
                {                         
                    alert('Registro duplicado, por favor verificar.');        
                }
            },
            error:(e)=>
            {
                console.log(e.status, e.statusText);
            }   
        });
    }
});    

// Excluir um registro
// Pegar o id do tr
// Fazer um update na tabela

// ============================ Document ready

$(document).ready(function() 
{
    getTabela();
    $('#div_alert').hide();
    $('#div_tabela').hide();
    thead = "<tr><th>ID</th><th>DESCRIÇÃO</th><th>IMPOSTO %</th><th>EDITAR</th></tr>";
    tfoot = "<tr><th></th><th></th><th></th><th></th></tr>";
    $('#thead').html(thead);
    $('#tfoot').html(tfoot);
});