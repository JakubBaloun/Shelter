import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dog, DogDocument } from './schemas/dog.schema';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<DogDocument>) {}

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    const newDog = new this.dogModel(createDogDto);
    return newDog.save();
  }

  async edit(id: string, updateDogDto: UpdateDogDto): Promise<Dog> {
    const dog = await this.dogModel.findById(id);
    if (!dog) {
      throw new Error(`Dog with id: ${id} does not exist!`);
    }

    if (
      updateDogDto.adoptable !== undefined &&
      updateDogDto.adoptable !== dog.adoptable
    ) {
      const statusChange = {
        date: new Date(),
        previousStatus: dog.adoptable,
        newStatus: updateDogDto.adoptable,
      };
      dog.statusHistory.push(statusChange);
    }

    Object.assign(dog, updateDogDto);

    return dog.save();
  }

  findAll(): Promise<Dog[]> {
    return this.dogModel.find().exec();
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogModel.findById(id).exec();

    if (!dog) {
      throw new Error(`Dog with id: ${id} does not exist!`);
    }
    return dog;
  }

  async delete(id: string): Promise<Dog> {
    const deletedDog = await this.dogModel.findByIdAndDelete(id).exec();

    if (!deletedDog) {
      throw new Error(`Dog with id: ${id} does not exist!`);
    }
    return deletedDog;
  }

  async findByName(name: string): Promise<Dog[]> {
    return this.dogModel.find({ name: { $regex: name, $options: 'i' } }).exec();
  }
}
