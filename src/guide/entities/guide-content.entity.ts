import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { LangueCode } from '../../common/enums/status.enum';

@Entity('contenus_guide')
export class GuideContent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  theme!: string;

  @Column({ length: 150, nullable: true })
  destination!: string;

  @Column({ type: 'text' })
  contenu!: string;

  @Column({ type: 'enum', enum: LangueCode, default: LangueCode.FR })
  langue!: LangueCode;

  @Column({ name: 'content_group_id', nullable: true })
  contentGroupId!: string;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string;

  @Column({ default: true })
  publie!: boolean;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;
}
