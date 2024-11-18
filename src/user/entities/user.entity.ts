import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'text', unique: true })
  personalHealthNumber: string;

  @Column({ type: 'timestamp', nullable: false })
  admission: Date;

  @Column({ type: 'boolean' })
  canEat: boolean;

  @Column({ type: 'boolean' })
  canDrink: boolean;

  // May change to enum later
  @Column({ type: 'text' })
  status: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  statusUpdated: Date;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4().split('-')[0];
  }
}
