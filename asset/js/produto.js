// ============================ Functions

function getTabela()
{
    arr     = [];
    arr[0]  = "produto a JOIN tipo b ON b.ID = a.ID_TIPO";
    arr[1]  = "a.ATIVO = 1";
    arr[2]  = "a.*, b.DESC ID_TIPO";
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
            line = '<tr><td>'+v.ID+'</td>'+'<td>'+v.ID_TIPO+'</td>'+'<td>'+v.DESC+'</td>'+'<td>'+v.VALOR+'</td>'+'<td>'+v.QUANTIDADE+'</td>'+'<td class="dd">'+link_id+'</td>';    
            line + '</tr>';  
        }
        else
        {
            line = line + '<tr><td>'+v.ID+'</td>'+'<td>'+v.ID_TIPO+'</td>'+'<td>'+v.DESC+'</td>'+'<td>'+v.VALOR+'</td>'+'<td>'+v.QUANTIDADE+'</td>'+'<td class="dd">'+link_id+'</td>';    
            line + '</tr>';  
        }  
        body = body == false ? line : body + line;
    });   
        
    $('#tbody').html(body);

}

function imprimirAlerta(msg=null)
{
    t = $('#conteudo_alert').html(msg);

    console.log(t);

    $('#div_alert').show();
    $('#div_tabela').hide();
}

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
                $('#div_cadastro').show();
                preenchaSelect('ID_TIPO',tipo);
            }
            else
            {      
                msg = "Necessario cadastrar ao menos um 'TIPO'. Por favor verificar.";                   
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
    $.each(array, function( n , v )
    {
        document.getElementById(idSelect).innerHTML += '<option value='+v.ID+'>'+v.DESC+'</option>';
    });
}

function validaDados()
{
    r = true;

    // se campos não preenchidos
    if($('input[name=DESC]').val()=='' || $('input[name=VALOR]').val()=='' || $('input[name=QUANTIDADE]').val()=='')
    {
        r = false;
    }

    // se valor negativo
    if($('input[name=VALOR]').val()<=0 || $('input[name=QUANTIDADE]').val()<0)
    {
        r = false;
    }
    return r;
}

// ============================ Ação usuario

$('#btn_submit').click(function()
{
    if(!validaDados())
    {
        alert('Digite um valor válido.');
    }
    else
    {   
        dados = $('#id_form').serialize();
        dados = dados + "&BD=produto";
        
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

// Editar um registro
// Pegar o id do tr
// Abrir um modal com os dados do registro
// Fazer um update
// $('table').on('click', '.dd', function() {
//     alert( $(this).text() );
// });

// ============================ Document ready

$(document).ready(function() 
{
    // Verifica se ha dados validos na table Tipo e carrega select
    getSelectTipo();
    getTabela();
    $('#div_alert').hide();
    $('#div_tabela').hide();
    $('#div_cadastro').hide();
    thead = "<tr><th>ID</th><th>TIPO</th><th>DESCRIÇÃO</th><th>VALOR R$</th><th>QUANTIDADE</th><th>EDITAR</th></tr>";
    tfoot = "<tr><th></th><th></th><th></th><th></th><th></th><th></th></tr>";
    $('#thead').html(thead);
    $('#tfoot').html(tfoot);
});