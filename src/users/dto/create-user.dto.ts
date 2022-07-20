import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    collaborater_id: number;
    @IsNotEmpty()
    @IsString()
    @MaxLength(4)
    proxym_id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    user_name: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    user_sec_name: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    user_passwrd: string;
    is_admin: boolean
    @IsOptional()
    user_image: string;
    @IsNotEmpty()
    @IsEmail()
    user_email: string;
    @IsNotEmpty()
    user_phone: number;
    @IsOptional()
    user_intersted_in: Event[];
}
