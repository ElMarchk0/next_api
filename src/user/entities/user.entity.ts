import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int64' })
  personalHeathNumber: number;

  @Column({ type: 'datetime', nullable: false })
  admission: Date;

  @Column({ type: 'boolean' })
  canEat: boolean;

  @Column({ type: 'boolean' })
  canDrink: boolean;

  // May change to enum later
  @Column({ type: 'string' })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  statusUpdated: Date;
}
