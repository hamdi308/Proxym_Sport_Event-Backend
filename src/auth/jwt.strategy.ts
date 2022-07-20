import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:'PROXYM_SECRET'
        })
    }
    async validate(payload: any) {
        return {
            collaborater_id: payload.id,
            proxym_id: payload.proxym_id,
            user_name: payload.name,
            user_sec_name: payload.secnd_name,
            is_admin: payload.is_admin,
            image: payload.image,
            user_email: payload.email,
            user_phone: payload.phone 
        };
    }
}