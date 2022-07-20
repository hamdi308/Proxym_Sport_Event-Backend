import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { AbilityModule } from 'src/ability/ability.module';
import { Event } from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,Event]), AbilityModule],
  controllers: [UsersController],
  providers: [UsersService,EventService],
  exports: [UsersService, EventService,TypeOrmModule.forFeature([UserEntity,Event])]
})
export class UsersModule {}
