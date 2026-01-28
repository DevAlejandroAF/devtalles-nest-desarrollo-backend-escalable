import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Suzuki',
      model: 'Vitara',
    },
  ];
  public findAll() {
    return this.cars;
  }
  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }
  public create(createCarDto: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
  update(id: string, updateCarDto: UpdateCarDTO) {
    let carDB = this.findOneById(id);
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);
    const cleanUpdateCarDto = Object.fromEntries(
      Object.entries(updateCarDto).filter(([_, value]) => value !== undefined),
    );
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...cleanUpdateCarDto,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  delete(id: string) {
    const carToDelete = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return carToDelete;
  }
}
