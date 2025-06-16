import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class InitializationService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createInitialUser();
  }

  private async createInitialUser() {
    const initialUser = {
      email: 'admin@email.com',
      username: 'admin',
      password: 'admin123', // En un entorno real, deberías usar un hash de contraseña
      role: 'admin',
    };

    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findOne({
      where: { email: initialUser.email },
    });

    if (!existingUser) {
      // Crear el usuario inicial
      const user = this.usersRepository.create(initialUser);
      await this.usersRepository.save(user);
      console.log('Usuario inicial creado exitosamente');
    } else {
      console.log('Usuario inicial ya existe');
    }
  }
}
