import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';

@Entity('niveaux')
@Unique(['cours', 'ordre'])
@Unique(['cours', 'code'])
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Course, (course) => course.niveaux, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cours_id' })
  cours!: Course;

  @Column({ length: 10 })
  code!: string;

  @Column({ length: 150 })
  titre!: string;

  @Column()
  ordre!: number;

  @Column({
    name: 'seuil_reussite',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 60,
  })
  seuilReussite!: number;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.niveau)
  lecons!: Lesson[];
}
