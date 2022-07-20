import { Controller, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AllowAny } from './auth/decorat/allowAny.decorator';

@ApiTags('app')
@Controller()
export default class AppController {
  constructor(private readonly appService: AppService, private authService:AuthService) {}
  @ApiOperation({ summary: 'login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        proxym_id: {
          type: 'string',
          example: 'h01',
          description: 'this is unique proxym id',
        },
        user_password: {
          type: 'string',
          example: 'hamdi0101',
          description: 'this the user password',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'user logged'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  @Post('auth/login')
  @AllowAny()
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
}
