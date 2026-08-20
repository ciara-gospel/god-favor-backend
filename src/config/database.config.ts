import { DataSource, DataSourceOptions } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { Level } from '../courses/entities/level.entity';
import { Lesson } from '../courses/entities/lesson.entity';
import { Content } from '../content/entities/content.entity';
import { Evaluation } from '../evaluations/entities/evaluation.entity';
import { Progress } from '../progress/entities/progress.entity';
import { Attestation } from '../progress/entities/attestation.entity';
import { Enrollment } from '../enrollments/entities/enrollment.entity';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { GuideContent } from '../guide/entities/guide-content.entity';

loadEnv();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Course,
    Level,
    Lesson,
    Content,
    Evaluation,
    Progress,
    Attestation,
    Enrollment,
    BlogPost,
    GuideContent,
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // toujours false : on passe par les migrations
  logging: process.env.NODE_ENV === 'development',
};

export default new DataSource(typeOrmConfig);
