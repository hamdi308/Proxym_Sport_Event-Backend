import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event as eventEntity } from './entities/event.entity';
import { AbilityModule } from 'src/ability/ability.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category as CategoryEntity } from 'src/categorys/entities/category.entity';
import {User as UserEntity } from '../users/entities/user.entity'
@Module({
  imports: [TypeOrmModule.forFeature([eventEntity, UserEntity, CategoryEntity]), AbilityModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
