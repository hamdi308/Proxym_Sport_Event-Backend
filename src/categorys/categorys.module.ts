import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category as CategoryEntity } from './entities/category.entity';
import { AbilityModule } from 'src/ability/ability.module';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), AbilityModule],
  controllers: [CategorysController],
  providers: [CategorysService],
  exports: [TypeOrmModule.forFeature([CategoryEntity])]
})
export class CategorysModule {}
