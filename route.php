<?php 

$home = "views/home.php";
  
if(isset($_GET['p']))
{  
  $p = $_GET['p'];
  switch (true) 
  {
    case ($_GET['p']=='tipo'):         
        include 'controller/Tipo.php';     
        break;

    case ($_GET['p']=='produto'):       
        include 'controller/Produto.php'; 
        break;
  
    default:
        include $home;
        break;
  }
}
else
{
    include $home;
}

?>



