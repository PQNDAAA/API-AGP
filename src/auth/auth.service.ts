import { Injectable, UnauthorizedException } from '@nestjs/common';
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

        const userData = result.rows[0];

        if(!userData){
            throw new UnauthorizedException('Email non trouvé.');
        }
        
        const isPasswordValid = await bcrypt.compare(user.password, userData.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Mot de passe incorrect.');
        }

        const token = await this.jwtService.signAsync({
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

        const result = await this.db.query(`INSERT INTO users(email, password, rememberMe) 
            VALUES($1, $2, $3) RETURNING *`, [user.email, passwordHash, false]);

            const success = result.rows.length > 0;

            return {
                success: success,
                message: success ? 'Utilisateur enregistré avec succès' : 'Erreur lors de l\'enregistrement de l\'utilisateur',
                data: result.rows[0]
            };
        }

        auth(token: string){
            try{
                return this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
            }catch(error){
                throw new UnauthorizedException();
            }
        }
    }
