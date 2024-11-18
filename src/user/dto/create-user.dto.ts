import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  // Personal Health Number
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  personalHealthNumber: string;

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
