import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    user_name: string;
    user_sec_name: string;
    user_passwrd: string;
    user_image: string;
    user_email: string;
    user_phone: number;
}