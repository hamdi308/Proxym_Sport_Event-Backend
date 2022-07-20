import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty() readonly proxym_id: string;
    @IsNotEmpty() readonly user_passwrd: string;
}
