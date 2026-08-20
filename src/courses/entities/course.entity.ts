import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Level } from './level.entity';

@Entity('cours')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'langue_enseignee', length: 100 })
  langueEnseignee!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ default: true })
  actif!: boolean;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;

  @OneToMany(() => Level, (level) => level.cours)
  niveaux!: Level[];
}
