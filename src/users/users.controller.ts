import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Inject, ForbiddenException, Injectable, Scope, Req, Put, Request, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { User } from './entities/user.entity';
import { ForbiddenError } from '@casl/ability'
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AllowAny } from 'src/auth/decorat/allowAny.decorator';
 @ApiTags('users')
 @Controller('users')
 export class UsersController {
   constructor(private readonly usersService: UsersService, private abilityFactory: AbilityFactory) { }
   SERVER_URL = "http://localhost:3000/";
   @Get('participates_on')
   @ApiOperation({ summary: 'liste of participated user on events' })
   @ApiResponse({
     status: 200,
     description: 'sucessfuly '
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
  @AllowAny()
   participates_on() {
     return this.usersService.participates_on();
   }
   @Get('interested_in')
   @ApiOperation({ summary: 'liste of intersted user on events' })
   @ApiResponse({
     status: 200,
     description: 'sucessfuly '
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   @AllowAny()
   intersted_on() {
     return this.usersService.intersted_on();
   }
  @UseGuards(JwtAuthGuard)
  @Get('currentuser')
  @ApiOperation({ summary: 'current user logged in' })
  @ApiResponse({
    status: 200,
    description: 'user logged data '
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  getCurrentUser(@Request() req) {
     return this.usersService.getCurrentUser(req);
  }
   @Post(':collaborater_id/intersted_in/:event_id')
   @ApiOperation({ summary: 'cintersted on event' })
  
   @ApiResponse({
     status: 200,
     description: 'intersted succesfully'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   @AllowAny()
   interstedin(@Param('collaborater_id') collaborater_id: number, @Param('event_id') event_id: number,) {
     return this.usersService.interstedin(collaborater_id, event_id);
   }
   @Post(':collaborater_id/participate/:event_id')
   @ApiOperation({ summary: 'participate on event' })
   @ApiResponse({
     status: 200,
     description: 'participated sucessfully'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   @AllowAny()
   participe(@Param('collaborater_id') collaborater_id: number, @Param('event_id') event_id: number) {
     return this.usersService.participe(collaborater_id, event_id);
   }
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Manage, subject: User })
  @Get('Admins')
  @ApiOperation({ summary: 'get all admins' })
  @ApiResponse({
    status: 200,
    description: 'all admins data'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  getAdmin() {
    return this.usersService.getAdmin()
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'create new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        proxym_id: {
          type: 'string',
          example: 'h92',
          description: 'this is unique proxym id',
        },
        user_name: {
          type: 'string',
          example: 'hamdi92',
          description: 'this is the user name',
        },
        user_sec_name: {
          type: 'string',
          example: 'hadda92',
          description: 'this is the user second name',
        },
        user_passwrd: {
          type: 'string',
          example: 'hamdi9292',
          description: 'this is the user password',
        },
        user_email: {
          type: 'string',
          example: 'hamdi92@gmail.com',
          description: 'this is the user email',
        },
        user_phone: {
          type: 'number',
          example: '94365066',
          description: 'this is the user phone number',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'user created'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  @AllowAny()
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);
      const hashedPassword = await bcrypt.hash(createUserDto.user_passwrd, 10);
      createUserDto.user_passwrd = hashedPassword
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError)
{        throw new ForbiddenException(error.message)
}    }
    
  }
   @Post(':proxym_id/upload/image')
   @ApiOperation({ summary: 'upload user image' })
   @ApiBody({
     schema: {
       type: 'object',
       properties: {
         image: {
           type: 'image',
           example: 'from your workspace',
           description: 'this is image of user',
         }
       }
     }
   })
   @ApiResponse({
     status: 200,
     description: 'image uploaded'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   @UseInterceptors(FileInterceptor('file',
     {
       storage: diskStorage({
         destination: './image',
         filename: (req, file, cb) => {
           const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
           return cb(null, `${randomName}${extname(file.originalname)}`)
         }
       })
     }
   )
   )
   setImage(@Param('proxym_id') proxym_id, @UploadedFile() file) {
     this.usersService.setImage(String(proxym_id), `${this.SERVER_URL}${file.path}`);
   }
   @Get('image/:fileId')
   async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
     return res.sendFile(fileId, { root:'./image' });
   }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all users data' })
  @ApiResponse({
    status: 200,
    description: 'All Data list'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  findAll() {
    return this.usersService.findAll();
  }
   @UseGuards(JwtAuthGuard)
   @Get(':proxym_id')
   @ApiOperation({ summary: 'Get user' })
   @ApiResponse({
     status: 200,
     description: 'user found'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   updateUser(@Param('proxym_id') proxym_id: string ,@Body() updateUserDto: UpdateUserDto) {
     return this.usersService.updateUser(proxym_id, updateUserDto);
  }
   @UseGuards(JwtAuthGuard)
   @UseGuards(AbilitiesGuard)
   @CheckAbilities({ action: Action.Delete, subject: User })
   @Delete('delete/:proxym_id')
   @ApiOperation({ summary: 'delete user' })
   @ApiResponse({
     status: 200,
     description: 'user deleted'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
   deleteUser(@Param('proxym_id') proxym_id: string) {
    return this.usersService.deleteUser(proxym_id);
   }
   
   @UseGuards(JwtAuthGuard)
   @UseGuards(AbilitiesGuard)
   @CheckAbilities({ action: Action.Manage, subject: User })
   @Patch('adminn/:proxym_id')
   @ApiOperation({ summary: 'add new admin' })
   @ApiResponse({
     status: 200,
     description: 'admin added'
   })
   @ApiResponse({
     status: 403,
     description: 'Forbidden'
   })
   @ApiResponse({
     status: 500,
     description: 'Internal server error'
   })
  addAdmin(@Param('proxym_id') proxym_id: string) {
    return this.usersService.addAdmin(proxym_id);
   }
}