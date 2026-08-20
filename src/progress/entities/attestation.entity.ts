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

@Entity('attestations')
@Unique(['utilisateur', 'niveau'])
export class Attestation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur!: User;

  @ManyToOne(() => Level, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'niveau_id' })
  niveau!: Level;

  @Column({ name: 'url_fichier', type: 'text' })
  urlFichier!: string;

  @CreateDateColumn({ name: 'date_emission' })
  dateEmission!: Date;
}
