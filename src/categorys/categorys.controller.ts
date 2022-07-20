import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';
import { User } from 'src/users/entities/user.entity';

@ApiTags('categorys')
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: User })
  @Post('add_category')
  @ApiOperation({ summary: 'create new category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'football',
          description: 'name of category of the event',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'category created'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'all categorys created' })
  @ApiResponse({
    status: 200,
    description: 'categorys list'
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
    return this.categorysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'search for category by id' })
  @ApiResponse({
    status: 200,
    description: 'category found'
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
    return this.categorysService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: User })
  @Post('update/:id')
  @ApiOperation({ summary: 'update category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'tennis',
          description: 'the new name of category of the event',
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'category updated'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorysService.updateCategory(id, updateCategoryDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: User })
  @Delete('delete/:id')
  @ApiOperation({ summary: 'delete category' })
  @ApiResponse({
    status: 200,
    description: 'category deleted'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  remove(@Param('id') id: string) {
    return this.categorysService.remove(+id);
  }
}
