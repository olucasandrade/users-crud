import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };
      const user = { id: 1, ...createUserDto };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(user);

      expect(await service.create(createUserDto)).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
        },
      ];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(users);

      expect(await service.findAll({})).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      expect(await service.find({ id: 1 })).toEqual(user);
    });

    it('should return null for non-existent user', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      expect(await service.find({ id: 999 })).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const updateUserDto = {
        firstName: 'Johnny',
        lastName: 'Updated',
      };
      const updatedUser = {
        id: 1,
        firstName: 'Johnny',
        lastName: 'Updated',
        email: 'john@example.com',
      };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      expect(
        await service.update({ where: { id: 1 }, data: updateUserDto }),
      ).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete and return the user', async () => {
      const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.user, 'delete').mockResolvedValue(user);
      expect(await service.delete({ id: 1 })).toEqual(user);
    });
  });
});
