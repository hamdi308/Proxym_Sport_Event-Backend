import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event as eventEntity } from './entities/event.entity';
import {User as UserEntity} from '../users/entities/user.entity'
@Injectable()
export class EventService {
  constructor(@InjectRepository(eventEntity) private readonly eventRepository: Repository<eventEntity>) { }

  async createEvent(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOne({ where: { id } });
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    const toUpdate = await this.findOne(id);
    const updated = Object.assign(toUpdate, updateEventDto);
    return await this.eventRepository.save(updated);

  }

  async removeEvent(id: number) {
    const EventDeleted = this.eventRepository.findOne({ where: { id } });
    return this.eventRepository.remove(await (EventDeleted));
  }
  async getParticipant(id: number): Promise<UserEntity[]> {
    const event = await this.eventRepository.findOne({ where: { id } });
    return (await event).participants;
  }
  
}
