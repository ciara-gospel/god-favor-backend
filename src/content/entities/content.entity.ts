import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Lesson } from '../../courses/entities/lesson.entity';
import { User } from '../../users/entities/user.entity';
import { ContentType, LangueCode } from '../../common/enums/status.enum';

@Entity('contenus')
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lecon_id' })
  lecon!: Lesson;

  @Column({ type: 'enum', enum: ContentType })
  type!: ContentType;

  @Column({ length: 200 })
  titre!: string;

  @Column({ name: 'url_fichier', type: 'text' })
  urlFichier!: string;

  @Column({ type: 'enum', enum: LangueCode, default: LangueCode.FR })
  langue!: LangueCode;

  @Column({ name: 'content_group_id', nullable: true })
  contentGroupId!: string;

  @Column({ name: 'duree_secondes', nullable: true })
  dureeSecondes!: number;

  @Column({ name: 'taille_octets', type: 'bigint', nullable: true })
  tailleOctets!: number;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'enseignant_id' })
  enseignant!: User;

  @Column({ default: false })
  publie!: boolean;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;
}
