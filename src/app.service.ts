import { Injectable } from '@nestjs/common';
import {DbService} from "./db/db.service";

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
}
