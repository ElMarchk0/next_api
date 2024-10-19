import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int64' })
  personalHeathNum: number;

  @Column({ type: 'boolean' })
  canEat: boolean;

  @Column({ type: 'boolean' })
  canDrink: boolean;

  // May change to enum later
  @Column({ type: 'string' })
  status: string;

  // May move to facility
  @Column({ type: 'varchar', length: 40 })
  location: string;
}
