import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFacilityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsInt()
  numberOfDoctors: number;

  @IsNotEmpty()
  @IsDecimal()
  averageAppointmentTime: number;

  @IsArray()
  @IsString({ each: true })
  patients: string[];
}
