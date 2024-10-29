import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  // Patient Id
  @PrimaryGeneratedColumn()
  userId: string;

  // Personal Health Number
  @IsNumberString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Incorrect number of digits in PHN' })
  @MaxLength(10, { message: 'Incorrect number of digits in PHN' })
  personalHeathNumber: number;

  // Can Eat
  @IsNotEmpty()
  @IsBoolean({ message: 'Please confirm if patient can eat' })
  canEat?: boolean;

  // Can Drink
  @IsNotEmpty()
  @IsBoolean({ message: 'Please confirm if patient can drink' })
  canDrink?: boolean;

  // Status
  @IsNotEmpty()
  @IsString()
  status?: string;

  // Admission
  @IsNotEmpty()
  @IsDateString()
  admission: Date;
}
