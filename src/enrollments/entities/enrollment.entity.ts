import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import {
  EnrollmentMode,
  EnrollmentStatus,
} from '../../common/enums/status.enum';

@Entity('inscriptions')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: User;

  @ManyToOne(() => Course, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'cours_id' })
  cours!: Course;

  @Column({ type: 'enum', enum: EnrollmentMode, default: EnrollmentMode.LIGNE })
  mode!: EnrollmentMode;

  @Column({
    name: 'statut_validation',
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.EN_ATTENTE,
  })
  statutValidation!: EnrollmentStatus;

  @Column({ name: 'notes_admin', type: 'text', nullable: true })
  notesAdmin!: string;

  @CreateDateColumn({ name: 'date_inscription' })
  dateInscription!: Date;

  @Column({ name: 'date_traitement', type: 'timestamptz', nullable: true })
  dateTraitement!: Date;
}
