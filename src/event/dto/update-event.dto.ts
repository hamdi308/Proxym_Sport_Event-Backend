import { PartialType } from '@nestjs/mapped-types';
import { Category } from 'src/categorys/entities/category.entity';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    event_name: string;
    event_place: string;
    event_description: string;
    event_start_at: Date;
    event_fees: number;
    event_end_date: Date;
    event_participents_capacity: number;
    category_id: Category['id'];
}
