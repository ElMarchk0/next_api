import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility } from './entities/facility.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  // Create a facility
  create(body: CreateFacilityDto, req: Request) {
    const {
      name,
      numberOfDoctors,
      averageAppointmentTime,
      patients,
    }: CreateFacilityDto = body;
    let facility: Facility = new Facility();
    facility.name = name;
    facility.numberOfDoctors = numberOfDoctors;
    facility.averageAppointmentTime = averageAppointmentTime;
    facility.patients = patients;
    return this.facilityRepository.save(facility);
  }

  async findOne(id: number): Promise<Facility> {
    const facility = await this.facilityRepository.findOne({ where: { id } });
    if (!facility) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }
    return facility;
  }

  async update(
    id: number,
    updateFacilityDto: UpdateFacilityDto,
  ): Promise<Facility> {
    const facility = await this.facilityRepository.findOne({ where: { id } });
    if (!facility) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }
    facility.name = updateFacilityDto.name;
    facility.numberOfDoctors = updateFacilityDto.numberOfDoctors;
    facility.averageAppointmentTime = updateFacilityDto.averageAppointmentTime;
    facility.patients = updateFacilityDto.patients;
    await this.facilityRepository.save(facility);
    return facility;
  }

  remove(id: number) {
    return this.facilityRepository.delete(id);
  }
}
