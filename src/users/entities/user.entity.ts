import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserRole } from '../../common/enums/role.enum';
import { UserStatus, LangueCode } from '../../common/enums/status.enum';

@Entity('utilisateurs')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  nom!: string;

  @Column({ length: 100 })
  prenom!: string;

  @Index({ unique: true })
  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ name: 'mot_de_passe_hash', length: 255 })
  motDePasseHash!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.VISITEUR })
  role!: UserRole;

  @Column({
    name: 'langue_preferee',
    type: 'enum',
    enum: LangueCode,
    default: LangueCode.FR,
  })
  languePreferee!: LangueCode;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.EN_ATTENTE })
  statut!: UserStatus;

  @Column({ name: 'email_verifie', default: false })
  emailVerifiee!: boolean;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation!: Date;

  @UpdateDateColumn({ name: 'date_mise_a_jour' })
  dateMiseAJour!: Date;
}
