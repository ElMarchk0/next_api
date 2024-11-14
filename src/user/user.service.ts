import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a user. Create the the User Id from a PHN
  public async create(body: CreateUserDto, req: Request): Promise<User> {
    const { personalHealthNumber, status, canDrink, canEat }: CreateUserDto =
      body;
    let user: User = new User();
    user.personalHealthNumber = personalHealthNumber;
    user.status = status;
    user.canDrink = canDrink;
    user.canEat = canEat;
    user.admission = new Date();
    return this.userRepository.save(user);
  }

  async updateStatus(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.status = updateUserDto.status;
    user.statusUpdated = new Date();
    return user;
  }
  public async updateCanEat(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.canEat = updateUserDto.canEat;
    user.statusUpdated = new Date();
    await this.userRepository.save(user);
    return user;
  }
  public async updateCanDrink(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.canDrink = updateUserDto.canDrink;
    user.statusUpdated = new Date();
    await this.userRepository.save(user);
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async remove(req: Request): Promise<User> {
    const user: User = <User>req.user;
    if (!user) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }
    return this.userRepository.remove(user);
  }
}
