import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(4)
    proxym_id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    user_passwrd: string;
}
