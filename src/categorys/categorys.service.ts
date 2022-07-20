import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category as CategoryEntity } from 'src/categorys/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategorysService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>){}
  create(createCategoryDto: CreateCategoryDto) {
    const newCat = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCat);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({where:{id}});
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const toUpdate = await this.findOne(id);
    const updated = Object.assign(toUpdate, updateCategoryDto);
    return await this.categoryRepository.save(updated);
  }

  remove(id: number) {
    return this.categoryRepository.delete(+id);
  }
}
