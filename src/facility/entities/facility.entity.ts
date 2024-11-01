import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'int8' })
  numberOfDoctors: number;

  @Column({ type: 'decimal' })
  averageAppointmentTime: number;

  @Column({ type: 'text', array: true })
  patients: string[];
}
