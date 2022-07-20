import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { AllowAny } from 'src/auth/decorat/allowAny.decorator';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService, private abilityFactory: AbilityFactory) {}
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: UserEntity })
  @Post('add_event')
  @ApiOperation({ summary: 'create new event' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        event_name: {
          type: 'string',
          example: 'football_proxym',
          description: 'name of the event',
        },
        event_place: {
          type: 'string',
          example: 'sousse',
          description: 'the place of the event',
        },
        event_description: {
          type: 'string',
          example: 'first football event for proxym collaboraters',
          description: 'description of the event',
        },
        event_start_at: {
          type: 'Date',
          example: '2023-07-19',
          description: 'start date of the event',
        },
        event_fees: {
          type: 'number',
          example: '10',
          description: 'fees of the event',
        },
        event_end_date: {
          type: 'Date',
          example: '2023-07-25',
          description: 'end date of the event',
        },
        event_participents_capacity: {
          type: 'number',
          example: '22',
          description: 'the maximum number of participants of the event',
        },
        category_id: {
          type: 'number',
          example: '1',
          description: 'the id of category of the event',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'event created'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }
  @AllowAny()
  @Get(':id/participants')
  @ApiOperation({ summary: 'get participant of event' })
  @ApiResponse({
    status: 200,
    description: 'sucessfuly excuted'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  getParticipant(@Param('id') id: number): Promise<UserEntity[]>  {
    return this.eventService.getParticipant(id);
  }  
  
  @UseGuards(JwtAuthGuard)
  @AllowAny()
  @Get('all')
  @ApiOperation({ summary: 'get all events' })
  @ApiResponse({
    status: 200,
    description: 'succed'
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
    return this.eventService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @AllowAny()
  @Get(':id')
  @ApiOperation({ summary: 'get an event' })
  @ApiResponse({
    status: 200,
    description: 'event sucessfully founded'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Manage, subject: UserEntity })
  @Post('update/:id')
  @ApiOperation({ summary: 'update an event' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        event_name: {
          type: 'string',
          example: 'football_proxym',
          description: 'name of the event',
        },
        event_place: {
          type: 'string',
          example: 'sousse',
          description: 'the place of the event',
        },
        event_description: {
          type: 'string',
          example: 'first football event for proxym collaboraters',
          description: 'description of the event',
        },
        event_start_at: {
          type: 'Date',
          example: '2023-07-19',
          description: 'start date of the event',
        },
        event_fees: {
          type: 'number',
          example: '10',
          description: 'fees of the event',
        },
        event_end_date: {
          type: 'Date',
          example: '2023-07-25',
          description: 'end date of the event',
        },
        event_participents_capacity: {
          type: 'number',
          example: '22',
          description: 'the maximum number of participants of the event',
        },
        category_id: {
          type: 'number',
          example: '1',
          description: 'the id of category of the event',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'event updated'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(+id, updateEventDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: UserEntity })
  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete an event' })
  @ApiResponse({
    status: 200,
    description: 'event deleted'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  removeEvent(@Param('id') id: string) {
    return this.eventService.removeEvent(+id);
  }
}
