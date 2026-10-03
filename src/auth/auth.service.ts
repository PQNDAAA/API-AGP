import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from './credentials/credentials.interface';
import { DbService } from '../db/db.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private db: DbService) {}

    async login(user: Credentials){
        const result = await this.db.query('SELECT * FROM users WHERE email = $1',
        [user.email]);

        if(!result){
            throw new Error('Email incorrect.');
        }

        const userData = result.rows[0];
        
        const isPasswordValid = await bcrypt.compare(user.password, userData.password);

        if(!isPasswordValid){
            throw new Error('Mot de passe incorrect.');
        }

        const token = this.jwtService.signAsync({
            userId: userData.id,
            userEmail: userData.email,
        });

        return {success: true,
            message: 'Authentification réussie',
            data: token
        };

    }

    async register(user: {email: string, password: string}){
        const passwordHash = await bcrypt.hash(user.password, 10);

        const result = await this.db.query(`INSERT INTO users(email, password) 
            VALUES($1, $2) RETURNING *`, [user.email, passwordHash]);

            const success = result.rows.length > 0;

            return {
                success: success,
                message: success ? 'Utilisateur enregistré avec succès' : 'Erreur lors de l\'enregistrement de l\'utilisateur',
                data: result.rows[0]
            };
        }
    }
