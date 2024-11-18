import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  // Can Eat (Optional for updates)
  @IsOptional()
  @IsBoolean({ message: 'Please confirm if patient can eat' })
  canEat?: boolean;

  // Can Drink (Optional for updates)
  @IsOptional()
  @IsBoolean({ message: 'Please confirm if patient can drink' })
  canDrink?: boolean;

  // Status (Optional for updates)
  @IsOptional()
  @IsString()
  status?: string;
}
