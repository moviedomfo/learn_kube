import ReportRepo from "./ReportRepo";
import { ReportBE } from "./../dto/ReportBE";
import { Helper } from "./../common/helper";
export default class LogsService {

    private _reportsRepo: ReportRepo;
    constructor() {
        this._reportsRepo = new ReportRepo();
    }

    /**
     * Create standar log
     * Create csv file
     * Create report record into database
     * @param report 
     * @param exist 
     */
    public async Create(report: ReportBE, exist: boolean): Promise<void> {

        report.action = exist ? 'Updated' : 'Created';

        const msg = `numSocio: ${report.numSocio} fechaModif: ${report.fechaModif} -> ${report.action}`;

        /**agrego log simple */
        await Helper.Log(msg, true);

        /**agrego csv para reportes */
        await Helper.AppendCSV({
            NumSocio: report.numSocio,
            FechaModif: report.fechaModif,
            Action: report.action

        });

        await this._reportsRepo.Insert(report);
    }




}
