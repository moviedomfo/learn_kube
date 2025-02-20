
DECLARE @dateTimeString VARCHAR(30) = '2023-08-17 19:59:22.6700000';
DECLARE @startDate DATETIME2 = CAST(@dateTimeString AS DATETIME2);
select * from dbo.Socios where dbo.Socios.ultimaModificacion >= @startDate