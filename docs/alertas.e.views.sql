SELECT * FROM lotes WHERE qtd_lote <= 20;
SELECT * FROM lotes WHERE DATEDIFF(data_vencimento, CURDATE())  = 90;
SELECT * FROM lotes WHERE DATEDIFF(data_vencimento, CURDATE())  = 45;

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


SELECT * FROM vw_relatorio_produtos_estoque;
SELECT * FROM vw_vencimento_45_dias;
SELECT * FROM vw_vencimento_90_dias;
SELECT * FROM vw_lote_baixo;

INSERT INTO lotes 
(fk_id_produto, lote, qtd_lote, data_vencimento, fk_id_fornecedor)
VALUES
(1, 'LT001', 15, DATE_ADD(CURDATE(), INTERVAL 45 DAY), 2),
(1, 'LT002', 50, DATE_ADD(CURDATE(), INTERVAL 90 DAY), 2),
(2, 'LT003', 5, DATE_ADD(CURDATE(), INTERVAL 45 DAY), 4),
(2, 'LT004', 100, DATE_ADD(CURDATE(), INTERVAL 120 DAY), 4),
(1, 'LT005', 18, DATE_ADD(CURDATE(), INTERVAL 90 DAY), 2);