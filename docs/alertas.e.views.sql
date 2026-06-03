	SELECT * FROM lotes WHERE qtd_lote <= 20;
	SELECT * FROM lotes WHERE DATEDIFF(data_vencimento, CURDATE())  = 90;
	SELECT * FROM lotes WHERE DATEDIFF(data_vencimento, CURDATE())  = 45;

DELIMITER $$

CREATE TRIGGER trigger_atualizar_lote
BEFORE INSERT ON movimentacoes
FOR EACH ROW
BEGIN
    DECLARE quantidade_disponivel INT;
    DECLARE nome_tipo VARCHAR(100);

    SELECT tipo_movimentacao INTO nome_tipo 
    FROM tipos_movimentacoes 
    WHERE id_tipo_mov = NEW.fk_id_tipo_mov;

    IF nome_tipo = 'saida' THEN

        SELECT qtd_lote INTO quantidade_disponivel 
        FROM lotes 
        WHERE id_lote = NEW.fk_id_lote;

        IF quantidade_disponivel < NEW.qnt_movimentada THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Saldo insuficiente no lote para realizar esta saída.';
        END IF;

        UPDATE lotes 
        SET qtd_lote = qtd_lote - NEW.qnt_movimentada
        WHERE id_lote = NEW.fk_id_lote;

    ELSEIF nome_tipo = 'entrada' THEN
        UPDATE lotes 
        SET qtd_lote = qtd_lote + NEW.qnt_movimentada
        WHERE id_lote = NEW.fk_id_lote;
    END IF;
END$$

DELIMITER ;

	CREATE VIEW vw_vencimento_90_dias AS 
		SELECT * FROM lotes WHERE data_vencimento = DATE_ADD(CURDATE(), INTERVAL 90 DAY); 

	CREATE VIEW vw_vencimento_45_dias AS 
		SELECT * FROM lotes WHERE data_vencimento = DATE_ADD(CURDATE(), INTERVAL 45 DAY);

	CREATE VIEW vw_lote_baixo AS 
		SELECT * FROM lotes WHERE qtd_lote <= 20;


	CREATE VIEW vw_relatorio_produtos_estoque AS
	SELECT
		p.id_produto AS codigo_produto,
		p.nome_produto AS produto,
		SUM(l.qtd_lote) AS estoque_total
	FROM produtos p
	INNER JOIN lotes l 
		ON l.fk_id_produto = p.id_produto
	GROUP BY p.id_produto, p.nome_produto;

	CREATE VIEW vw_lote_relatorio AS
	SELECT lotes.id_lote, lotes.qtd_lote, lotes.data_vencimento, fornecedores.cnpj, produtos.nome_produto
	FROM lotes
	JOIN fornecedores ON lotes.fk_id_fornecedor = fornecedores.id_fornecedor
	JOIN produtos ON lotes.fk_id_produto = produtos.id_produto;


	SELECT * FROM vw_relatorio_produtos_estoque;
	SELECT * FROM vw_vencimento_45_dias;
	SELECT * FROM vw_vencimento_90_dias;
	SELECT * FROM vw_lote_baixo;

