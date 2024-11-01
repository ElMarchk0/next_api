import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'int' })
  personalHealthNumber: number;

  @Column({ type: 'timestamp', nullable: false })
  admission: Date;

  @Column({ type: 'boolean' })
  canEat: boolean;

  @Column({ type: 'boolean' })
  canDrink: boolean;

  // May change to enum later
  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  statusUpdated: Date;
}
