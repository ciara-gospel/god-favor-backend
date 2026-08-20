import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Level } from './level.entity';

@Entity('lecons')
@Unique(['niveau', 'ordre'])
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Level, (level) => level.lecons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'niveau_id' })
  niveau!: Level;

  @Column({ length: 200 })
  titre!: string;

  @Column()
  ordre!: number;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;
}
