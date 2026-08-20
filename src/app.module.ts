import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { typeOrmConfig } from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    // les modules métier (AuthModule, UsersModule, CoursesModule...) viendront ici
    // au fur et à mesure qu'on les construira
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
