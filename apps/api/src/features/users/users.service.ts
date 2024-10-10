import { Injectable } from "@nestjs/common";

import { UserDto } from "./dtos/user.dto";
import { UserCreateDto } from "./dtos/user-create.dto";
import { UsersEmailAlreadyExistException } from "./exceptions/users-email-already-exist.exception";
import { UsersUsernameAlreadyExistException } from "./exceptions/users-username-already-exist.exception";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getByIdentifier(identifier: string): Promise<UserDto | null> {
    return this.usersRepository.getByIdentifier(identifier);
  }

  async getById(id: string) {
    return this.usersRepository.getById(id);
  }

  async create(user: UserCreateDto): Promise<UserDto> {
    const sameEmailUser = await this.getByIdentifier(user.email);

    if (sameEmailUser) {
      throw new UsersEmailAlreadyExistException(user.email);
    }

    const sameUsernameEmail = await this.getByIdentifier(user.username);

    if (sameUsernameEmail) {
      throw new UsersUsernameAlreadyExistException(user.username);
    }

    return this.usersRepository.create(user);
  }
}
