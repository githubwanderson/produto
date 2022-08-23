-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.11-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para bd_produto
CREATE DATABASE IF NOT EXISTS `bd_produto` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `bd_produto`;

-- Copiando estrutura para tabela bd_produto.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_TIPO` int(11) NOT NULL,
  `DESC` varchar(50) NOT NULL,
  `VALOR` float(10,2) NOT NULL DEFAULT 0.00,
  `QUANTIDADE` int(11) NOT NULL,
  `ATIVO` int(11) NOT NULL DEFAULT 1 COMMENT '1=ATIVO, 0=INATIVO',
  `ID_USER` int(11) NOT NULL DEFAULT 0 COMMENT 'SEM MODULO DE USUARIO',
  `DT_CADASTRO` datetime NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela bd_produto.produto: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` (`ID`, `ID_TIPO`, `DESC`, `VALOR`, `QUANTIDADE`, `ATIVO`, `ID_USER`, `DT_CADASTRO`) VALUES
	(1, 1, 'POLO WS', 110.00, 15, 1, 0, '2022-08-22 22:20:56'),
	(2, 1, 'REGATA SS', 50.00, 20, 1, 0, '2022-08-22 22:21:18'),
	(3, 1, 'BASICA', 50.00, 10, 1, 0, '2022-08-22 22:21:40'),
	(4, 2, 'JEANS WS', 220.00, 10, 1, 0, '2022-08-22 22:22:04'),
	(5, 2, 'JEANS SS', 130.00, 15, 1, 0, '2022-08-22 22:22:44');
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_produto.tipo
CREATE TABLE IF NOT EXISTS `tipo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DESC` varchar(50) NOT NULL,
  `VALOR_IMPOSTO` int(11) NOT NULL DEFAULT 0,
  `ATIVO` int(11) NOT NULL DEFAULT 1 COMMENT '1=ATIVO, 0=INATIVO',
  `ID_USER` int(11) NOT NULL DEFAULT 0 COMMENT 'SEM MODULO DE USUARIO',
  `DT_CADASTRO` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `DESC` (`DESC`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela bd_produto.tipo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` (`ID`, `DESC`, `VALOR_IMPOSTO`, `ATIVO`, `ID_USER`, `DT_CADASTRO`) VALUES
	(1, 'CAMISETA', 10, 1, 0, '2022-08-22 22:18:27'),
	(2, 'CALÇA', 5, 1, 0, '2022-08-22 22:18:52');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;

-- Copiando estrutura para tabela bd_produto.vendas
CREATE TABLE IF NOT EXISTS `vendas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USER` varchar(50) NOT NULL DEFAULT '0' COMMENT 'SEM MODULO DE USUARIO',
  `ID_PRODUTO` int(11) NOT NULL,
  `QTDE_SELECIONADO` int(11) NOT NULL,
  `VALOR` float(10,2) NOT NULL DEFAULT 0.00 COMMENT 'VALOR QUE O USUARIO PAGOU NA DATA DA COMPRA',
  `VALOR_IMPOSTO` float(10,2) NOT NULL DEFAULT 0.00 COMMENT 'VALOR DO IMPOSTO NA DATA DA COMPRA',
  `DT_CADASTRO` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela bd_produto.vendas: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
