import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Level } from '../../courses/entities/level.entity';
import { ProgressStatus } from '../../common/enums/status.enum';

@Entity('progressions')
@Unique(['utilisateur', 'niveau'])
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: User;

  @ManyToOne(() => Level, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'niveau_id' })
  niveau!: Level;

  @Column({
    type: 'enum',
    enum: ProgressStatus,
    default: ProgressStatus.EN_COURS,
  })
  statut!: ProgressStatus;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  score!: number;

  @Column({ name: 'nombre_tentatives', default: 0 })
  nombreTentatives!: number;

  @CreateDateColumn({ name: 'date_debut' })
  dateDebut!: Date;

  @Column({ name: 'date_validation', type: 'timestamptz', nullable: true })
  dateValidation!: Date;
}
