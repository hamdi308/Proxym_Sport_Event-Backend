import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor( private authService: AuthService) {
        super({
            usernameField: 'proxym_id',
            passwordField: 'user_passwrd'
        });
    }
    
    async validate(proxym_id: string, user_passwrd: string): Promise<any>{
        const user = await this.authService.validateUser(proxym_id, user_passwrd);
        if (!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}