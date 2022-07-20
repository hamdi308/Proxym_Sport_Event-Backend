import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'PROXYM_SECRET',
    signOptions:{expiresIn:'1d'},
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
exports:[AuthService]})
export class AuthModule {}
