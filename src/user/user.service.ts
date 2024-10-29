import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  // Create a user. Create the the User Id from a PHN
  public async create(body: CreateUserDto, req: Request): Promise<User> {
    const { personalHeathNumber, status, canDrink, canEat }: CreateUserDto =
      body;
    let user: User = new User();
    user.personalHeathNumber = personalHeathNumber;
    user.status = status;
    user.canDrink = canDrink;
    user.canEat = canEat;
    user.admission = new Date();
    return this.repository.save(user);
  }

  public async updateStatus(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.status = body.status;
    user.statusUpdated = new Date();
    return this.repository.save(user);
  }
  public async updateCanEat(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.canEat = body.canEat;
    user.statusUpdated = new Date();
    return this.repository.save(user);
  }
  public async updateCanDrink(
    body: UpdateUserDto,
    req: Request,
  ): Promise<User> {
    const user: User = <User>req.user;
    user.canDrink = body.canDrink;
    user.statusUpdated = new Date();
    return this.repository.save(user);
  }
}
