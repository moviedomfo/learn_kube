

DECLARE @dateTimeString VARCHAR(30) = '2023-08-15T00:00:22';
DECLARE @startDate DATETIME2 = CAST(@dateTimeString AS DATETIME2);

select ultimaModificacion,documento,nombre  from dbo.Socios where dbo.Socios.ultimaModificacion >= @startDate
ORDER BY ultimaModificacion 