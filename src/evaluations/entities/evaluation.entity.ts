import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Level } from '../../courses/entities/level.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => Level, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'niveau_id' })
  niveau!: Level;

  @Column({ type: 'jsonb' })
  questions!: Record<string, any>[];

  @Column({
    name: 'seuil_reussite',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 60,
  })
  seuilReussite!: number;

  @Column({ name: 'nombre_tentatives_max', default: 3 })
  nombreTentativesMax!: number;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;
}
