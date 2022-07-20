import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityFactory } from './ability.factory';
import { User as UserEntity } from 'src/users/entities/user.entity'
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilityModule { }