import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    async validateUser(proxym_id: string, user_passwrd: string): Promise<any> {
        const user = await this.usersService.findOne(proxym_id);
        const isPassword = await bcrypt.compare(user_passwrd, user.user_passwrd);
        if (user) {
            if (isPassword) {
                return user;
            }
            throw new HttpException('wrong password...', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('no user with that idantifiant...', HttpStatus.BAD_REQUEST); 
}
    async login(user: any) {
        const payload = { id: user.collaborater_id, proxym_id: user.proxym_id ,name: user.user_name, secnd_name: user.user_sec_name,is_admin:user.is_admin,image:user.image,email:user.user_email,phone:user.user_phone };
        return {
            acess_token: this.jwtService.sign(payload),
        };
    }
    
}
