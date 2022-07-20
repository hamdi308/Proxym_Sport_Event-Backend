import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Category } from "src/categorys/entities/category.entity";
export class CreateEventDto { 
    @IsString()
    @IsNotEmpty()
    event_name: string;
    @IsString()
    @IsNotEmpty()
    event_place: string;
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    event_description: string;
    @IsDate()
    @IsNotEmpty()
    event_start_at: Date;
    @IsNumber()
    @IsNotEmpty()
    event_fees
    @IsDate()
    @IsOptional()
    @IsNotEmpty()
    event_end_date: Date;
    @IsNumber()
    @IsNotEmpty()
    event_participents_capacity: number;
    category_id: Category['id'];
}
