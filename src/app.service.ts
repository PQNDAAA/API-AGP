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

    const result = await this.db.query(`INSERT INTO internalcontrols(entrydate, agentname, domainname, requiredworkuniform, workstationuniform, equipmentmaterials, professionalcard, ptiisworking, comment)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
            internalControl.comment
        ]);
    return result.rows[0];
  }
}
