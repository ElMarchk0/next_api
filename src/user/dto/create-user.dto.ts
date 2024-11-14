import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  // Personal Health Number
  @IsNumberString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Incorrect number of digits in PHN' })
  @MaxLength(10, { message: 'Incorrect number of digits in PHN' })
  personalHealthNumber: number;

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
  @IsDate()
  admission: Date;
}
