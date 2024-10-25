import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async updateStatus(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.status = body.status;
    return this.repository.save(user);
  }
  public async updateCanEat(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = <User>req.user;
    user.canEat = body.canEat;
    return this.repository.save(user);
  }
  public async updateCanDrink(
    body: UpdateUserDto,
    req: Request,
  ): Promise<User> {
    const user: User = <User>req.user;
    user.canDrink = body.canDrink;
    return this.repository.save(user);
  }
}
