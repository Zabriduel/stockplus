-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stockplus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stockplus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stockplus` DEFAULT CHARACTER SET utf8 ;
USE `stockplus` ;

-- -----------------------------------------------------
-- Table `stockplus`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome_categoria` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`produtos` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `fk_id_categoria` INT NOT NULL,
  `nome_produto` VARCHAR(100) NOT NULL,
  `valor_produto` DECIMAL(10,2) NOT NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_produto`),
  INDEX `fk_id_categoria_idx` (`fk_id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_id_categoria`
    FOREIGN KEY (`fk_id_categoria`)
    REFERENCES `stockplus`.`categorias` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`pessoa` (
  `idPessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idPessoa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`fornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`fornecedores` (
  `id_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `cnpj` CHAR(14) NOT NULL,
  `fk_id_pessoa` INT NOT NULL,
  PRIMARY KEY (`id_fornecedor`),
  INDEX `fk_fornecedores_pessoa1_idx` (`fk_id_pessoa` ASC) VISIBLE,
  CONSTRAINT `fk_fornecedores_pessoa1`
    FOREIGN KEY (`fk_id_pessoa`)
    REFERENCES `stockplus`.`pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`produto_fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`produto_fornecedor` (
  `id_prod_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `fk_id_produto` INT NOT NULL,
  `fk_id_fornecedor` INT NOT NULL,
  `quantidade` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_prod_fornecedor`),
  INDEX `fk_id_produto_idx` (`fk_id_produto` ASC) VISIBLE,
  INDEX `fk_id_fornecedor_idx` (`fk_id_fornecedor` ASC) VISIBLE,
  CONSTRAINT `fk_id_produto`
    FOREIGN KEY (`fk_id_produto`)
    REFERENCES `stockplus`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_fornecedor`
    FOREIGN KEY (`fk_id_fornecedor`)
    REFERENCES `stockplus`.`fornecedores` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`imagens`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`imagens` (
  `id_imagem` INT NOT NULL AUTO_INCREMENT,
  `vinculo_imagem` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_imagem`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`imagens_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`imagens_produtos` (
  `id_imagem_prod` INT NOT NULL AUTO_INCREMENT,
  `fk_id_imagem` INT NOT NULL,
  `fk_id_produto` INT NOT NULL,
  PRIMARY KEY (`id_imagem_prod`),
  INDEX `fk_id_imagem_idx` (`fk_id_imagem` ASC) VISIBLE,
  INDEX `fk_id_produto_idx` (`fk_id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_id_imagem`
    FOREIGN KEY (`fk_id_imagem`)
    REFERENCES `stockplus`.`imagens` (`id_imagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_produto_images`
    FOREIGN KEY (`fk_id_produto`)
    REFERENCES `stockplus`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `cpf` CHAR(11) NOT NULL,
  `email` VARCHAR(100) NULL,
  `data_cadastro` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_id_pessoa` INT NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_clientes_pessoa1_idx` (`fk_id_pessoa` ASC) VISIBLE,
  CONSTRAINT `fk_clientes_pessoa1`
    FOREIGN KEY (`fk_id_pessoa`)
    REFERENCES `stockplus`.`pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`pedidos` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `fk_id_cliente` INT NOT NULL,
  `valor_total` DECIMAL(10,2) NOT NULL,
  `qtd_itens` INT NOT NULL,
  `data_pedido` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_id_cliente_idx` (`fk_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_id_cliente`
    FOREIGN KEY (`fk_id_cliente`)
    REFERENCES `stockplus`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`telefone` (
  `id_telefone` INT NOT NULL AUTO_INCREMENT,
  `telefone` VARCHAR(11) NOT NULL,
  `fk_id_pessoa` INT NOT NULL,
  PRIMARY KEY (`id_telefone`),
  UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE,
  INDEX `fk_telefone_pessoa1_idx` (`fk_id_pessoa` ASC) VISIBLE,
  CONSTRAINT `fk_telefone_pessoa1`
    FOREIGN KEY (`fk_id_pessoa`)
    REFERENCES `stockplus`.`pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`enderecos_clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`enderecos_clientes` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `fk_id_cliente` INT NOT NULL,
  `logradouro` VARCHAR(100) NOT NULL,
  `numero` VARCHAR(15) NOT NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `complemento` VARCHAR(100) NULL,
  PRIMARY KEY (`id_endereco`),
  INDEX `fk_id_cliente_idx` (`fk_id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_id_cliente_endereco`
    FOREIGN KEY (`fk_id_cliente`)
    REFERENCES `stockplus`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`itens_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`itens_pedido` (
  `id_itens_pedido` INT NOT NULL AUTO_INCREMENT,
  `fk_id_produto` INT NOT NULL,
  `fk_id_pedido` INT NOT NULL,
  `quantidade` INT NOT NULL,
  PRIMARY KEY (`id_itens_pedido`),
  INDEX `fk_id_produto_idx` (`fk_id_produto` ASC) VISIBLE,
  INDEX `fk_id_pedido_idx` (`fk_id_pedido` ASC) VISIBLE,
  CONSTRAINT `fk_id_produto_itens`
    FOREIGN KEY (`fk_id_produto`)
    REFERENCES `stockplus`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_pedido`
    FOREIGN KEY (`fk_id_pedido`)
    REFERENCES `stockplus`.`pedidos` (`id_pedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`lotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`lotes` (
  `id_lote` INT NOT NULL AUTO_INCREMENT,
  `fk_id_produto` INT NOT NULL,
  `lote` VARCHAR(10) NOT NULL,
  `qtd_lote` INT NOT NULL,
  `data_vencimento` DATE NOT NULL,
  `fk_id_fornecedor` INT NOT NULL,
  PRIMARY KEY (`id_lote`),
  INDEX `fk_id_produto_idx` (`fk_id_produto` ASC) VISIBLE,
  INDEX `fk_lotes_fornecedores1_idx` (`fk_id_fornecedor` ASC) VISIBLE,
  CONSTRAINT `fk_id_produto_lote`
    FOREIGN KEY (`fk_id_produto`)
    REFERENCES `stockplus`.`produtos` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lotes_fornecedores1`
    FOREIGN KEY (`fk_id_fornecedor`)
    REFERENCES `stockplus`.`fornecedores` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`tipos_movimentacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`tipos_movimentacoes` (
  `id_tipo_mov` INT NOT NULL AUTO_INCREMENT,
  `tipo_movimentacao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_tipo_mov`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stockplus`.`movimentacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockplus`.`movimentacoes` (
  `id_movimentacoes` INT NOT NULL AUTO_INCREMENT,
  `fk_id_lote` INT NOT NULL,
  `fk_id_tipo_mov` INT NOT NULL,
  `qnt_movimentada` INT NOT NULL,
  `data_movimentacao` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_movimentacoes`),
  INDEX `fk_id_lote_idx` (`fk_id_lote` ASC) VISIBLE,
  INDEX `fk_id_tipo_mov_idx` (`fk_id_tipo_mov` ASC) VISIBLE,
  CONSTRAINT `fk_id_lote`
    FOREIGN KEY (`fk_id_lote`)
    REFERENCES `stockplus`.`lotes` (`id_lote`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_tipo_mov`
    FOREIGN KEY (`fk_id_tipo_mov`)
    REFERENCES `stockplus`.`tipos_movimentacoes` (`id_tipo_mov`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
