import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Event } from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private dataSource: DataSource, @InjectRepository(Event) private readonly eventRepository: Repository<Event>, private readonly eventService: EventService) {
  }
  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  findAll() {
    return this.userRepository.find();
  }
  
  findOne(proxym_id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { proxym_id } });
  }
  async updateUser(proxym_id: string, updateUserDto: UpdateUserDto):Promise<UserEntity> {
    const toUpdate = await this.findOne(proxym_id);
    const hashedPassword = await bcrypt.hash(updateUserDto.user_passwrd, 10);
    updateUserDto.user_passwrd = hashedPassword
    const updated = Object.assign(toUpdate, updateUserDto);
    return await this.userRepository.save(updated);
    
  }
  async deleteUser(proxym_id: string): Promise<UserEntity> {
    const UserDeleted = this.userRepository.findOne({ where: { proxym_id } });
    if ((await UserDeleted).is_admin == true) {
      throw new NotFoundException('can\'t delete admin ');
    }
    return this.userRepository.remove(await(UserDeleted));
  }
  getAdmin() {
    return this.userRepository.find({
      where: {
        is_admin: true
      }
    });
  }
  getCurrentUser(@Request() req): Promise<UserEntity> {
    const user = req.user;
    return user;
}
  async addAdmin(proxym_id: string){
    const newAdmin = this.userRepository.findOne({ where: { proxym_id } });
    if ((await newAdmin).is_admin == true) {
      throw new NotFoundException('already is admin');}
    (await newAdmin).is_admin = true;
    return  this.userRepository.save((await newAdmin));
  }
  public async setImage(proxym_id: string, avatarUrl: string) {
    const imageTo = await this.findOne(proxym_id);
    const updateImg = Object.assign(imageTo, { image: avatarUrl });
    return await this.userRepository.save(updateImg);
  }
  async interstedin(collaborater_id: number, event_id: number) {
    const user_interst= this.userRepository.findOne({ where: { collaborater_id } });
    const event_intersted_in =  (await this.eventService.findOne(event_id));
    (await user_interst).events_intersted=[];
    (await user_interst).events_intersted.push(event_intersted_in);
    return await this.userRepository.save(await user_interst);

  }
  async participe(collaborater_id: number, event_id: number): Promise<UserEntity> {
    const user_parti = this.userRepository.findOne({ where: { collaborater_id } });
    const event_parti_in = (await this.eventService.findOne(event_id));
    const table: any[] = (await user_parti).events_participated_in ;
    table.push(event_parti_in);
    return this.userRepository.save((await user_parti));
  }
  async participates_on(){
    const event_inte = await this.eventRepository.createQueryBuilder("Event")
      .leftJoinAndSelect("Event.participants", "user")
      .getMany();
    return event_inte;
  }
  async intersted_on() {
    const event_inte = await this.eventRepository.createQueryBuilder("Event")
      .leftJoinAndSelect("Event.users", "user")
      .getMany();
    return event_inte;
  }
}