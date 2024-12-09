import {
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Param,
  Body,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
import { Dog } from './schemas/dog.schema';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    try {
      return await this.dogsService.create(createDogDto);
    } catch {
      throw new ForbiddenException('Could not create dog.');
    }
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<Dog> {
    try {
      return await this.dogsService.edit(id, updateDogDto);
    } catch {
      throw new ForbiddenException('Could not update the dog!');
    }
  }

  @Get()
  async findAll(): Promise<Dog[]> {
    try {
      return await this.dogsService.findAll();
    } catch {
      throw new ForbiddenException('Could not fetch dogs.');
    }
  }

  @Get('/search')
  async findByName(@Query('name') name: string): Promise<Dog[]> {
    if (!name) {
      throw new BadRequestException('Name queryparametr is required.');
    }
    return this.dogsService.findByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dog> {
    try {
      return await this.dogsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Dog> {
    try {
      return await this.dogsService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
