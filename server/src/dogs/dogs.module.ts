import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './schemas/dog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
