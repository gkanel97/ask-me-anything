import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const keyword = await this.manager.create(Keyword, createKeywordDto);
    return this.manager.save(keyword);
  }

  async findAll(): Promise<Keyword[]> {
    return this.manager.find(Keyword);
  }

  // async findOne(id: number): Promise<Keyword> {
  //   return this.manager.findOne(Keyword, id)
  // }
  //
  // async update(id: number, updateKeywordDto: UpdateKeywordDto): Promise<Keyword> {
  //   return `This action updates a #${id} keyword`;
  // }
  //
  // async remove(id: number): Promise<void> {
  //   return `This action removes a #${id} keyword`;
  // }
}
