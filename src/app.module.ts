import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module'
import { EventModule } from './event/event.module';
import { CategorysModule } from './categorys/categorys.module';
import { AuthModule } from './auth/auth.module';
import entities from './';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AbilityModule } from './ability/ability.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@Module({
  imports: [EventModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'stage',
      autoLoadEntities: true,
      entities: entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(entities),
    CategorysModule,
    AuthModule,
    UsersModule,
    AbilityModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useFactory: ref => new JwtAuthGuard(ref),
    inject: [Reflector],
  }, LocalAuthGuard],
})
export class AppModule { }
