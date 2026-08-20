import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LangueCode } from '../../common/enums/status.enum';

@Entity('articles_blog')
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'auteur_id' })
  auteur!: User;

  @Column({ length: 250 })
  titre!: string;

  @Column({ type: 'text' })
  contenu!: string;

  @Column({ length: 100, nullable: true })
  categorie!: string;

  @Column({ type: 'enum', enum: LangueCode, default: LangueCode.FR })
  langue!: LangueCode;

  @Column({ name: 'content_group_id', nullable: true })
  contentGroupId!: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string;

  @Column({ default: false })
  publie!: boolean;

  @Column({ name: 'date_publication', type: 'timestamptz', nullable: true })
  datePublication!: Date;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;
}
