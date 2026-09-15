import { Injectable } from '@nestjs/common';
import {DbService} from "./db/db.service";
import {InternalControl} from "./internal-control/internal-control.interface";

@Injectable()
export class AppService {
  constructor(private db: DbService){}

  getHello() {
    return {message: 'API AGP'};
  }

  async getInternalControls(){
    const result = await this.db.query(
        'SELECT * FROM internalcontrols'
    );
    return result.rows;
  }

  async addInternalControl(internalControl: InternalControl){

    const result = await this.db.query(`INSERT INTO internalcontrols(entrydate, agentname, domainname, requiredworkuniform, workstationuniform, equipmentmaterials, professionalcard, ptiisworking, comment, professionalcardnumber)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *`,
        [
            internalControl.entrydate,
            internalControl.agentname,
            internalControl.domainname,
            internalControl.requiredworkuniform,
            internalControl.workstationuniform,
            internalControl.equipmentmaterials,
            internalControl.professionalcard,
            internalControl.ptiisworking,
            internalControl.comment,
            internalControl.professionalcardnumber
        ]);

    const success = result.rows.length > 0;

    return {
        success: success,
        message: success ? `Le contrôle interne a bien été ajouté` :
            `Le contrôle interne n'a pas été ajouté`,
        data: result.rows[0]
    };
  }

  async deleteInternalControl(id:number){
      const result = await this.db.query(`DELETE FROM internalcontrols WHERE id = $1 RETURNING *`,
          [id]);

      const success = result.rows.length > 0;

      return {
          success: success,
          message: success ? `Le contrôle interne n°${id} a été supprimé.` :
              `Le contrôle interne n°${id} n'a pas été trouvé.`
      }
  }
}
