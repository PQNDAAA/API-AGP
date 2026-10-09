import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService implements OnModuleInit {
    private pool: Pool;

    onModuleInit() {
        this.pool = new Pool({
            host: '127.0.0.1',
            port: 5432,
            user: 'agp_user',
            password: '089!3503Ro!',
            database: 'agp_db'
        });
    }

    query(text: string, params?: any){
        return this.pool.query(text,params);
    }

    async hasTokenBlacklisted(jti: string): Promise<boolean> {
        const result = await this.pool.query('SELECT 1 FROM token_blacklist WHERE jti = $1', [jti]);

        return result.rows.length > 0;
    }

}
