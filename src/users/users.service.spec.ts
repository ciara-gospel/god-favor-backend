import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// On simule le repository TypeORM : en test unitaire, on ne touche jamais
// la vraie base de données — seul le comportement du service est vérifié.
const mockUsersRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockRepository = Partial<Record<keyof Repository<User>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateUserDto = {
      nom: 'Ologuie',
      prenom: 'Arlette',
      email: 'arlette@example.com',
      motDePasse: 'motdepasse123',
    };

    it('devrait créer un utilisateur avec le mot de passe haché', async () => {
      repository.findOne!.mockResolvedValue(null); // aucun compte existant avec cet email
      repository.create!.mockImplementation((data: Partial<User>) => data);
      repository.save!.mockImplementation((data: Partial<User>) =>
        Promise.resolve({ id: 'uuid-1', ...data } as User),
      );

      const result = await service.create(dto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(result.email).toBe(dto.email);
      expect(result.motDePasseHash).not.toBe(dto.motDePasse); // jamais le mot de passe en clair

      const motDePasseValide = await bcrypt.compare(
        dto.motDePasse,
        result.motDePasseHash,
      );
      expect(motDePasseValide).toBe(true);
    });

    it("devrait rejeter la création si l'email existe déjà", async () => {
      repository.findOne!.mockResolvedValue({
        id: 'uuid-existant',
        email: dto.email,
      });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it("devrait retourner l'utilisateur trouvé", async () => {
      const user = { id: 'uuid-1', email: 'test@example.com' };
      repository.findOne!.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(user);
    });

    it('devrait retourner null si aucun utilisateur trouvé', async () => {
      repository.findOne!.mockResolvedValue(null);

      const result = await service.findByEmail('inconnu@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it("devrait retourner l'utilisateur trouvé", async () => {
      const user = { id: 'uuid-1', email: 'test@example.com' };
      repository.findOne!.mockResolvedValue(user);

      const result = await service.findById('uuid-1');

      expect(result).toEqual(user);
    });

    it('devrait lever une NotFoundException si aucun utilisateur trouvé', async () => {
      repository.findOne!.mockResolvedValue(null);

      await expect(service.findById('uuid-inexistant')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
