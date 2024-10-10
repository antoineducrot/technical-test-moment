import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "@/features/users/users.service";

import { AuthUsersRepository } from "./auth-users.repository";
import { BcryptService } from "./bcrypt.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { LoginDto, LoginResponseDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { AuthInvalidCredentialsException } from "./exceptions/auth-invalid-credentials.exception";

@Injectable()
export class AuthService {
  constructor(
    private readonly authUsersRepository: AuthUsersRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly usersService: UsersService,
  ) {}

  async login({ identifier, password }: LoginDto): Promise<LoginResponseDto> {
    const authUser = await this.authUsersRepository.getByIdentifier(identifier);

    if (!authUser) {
      throw new AuthInvalidCredentialsException();
    }

    if (!(await this.bcryptService.compare(password, authUser.password))) {
      throw new AuthInvalidCredentialsException();
    }

    return {
      accessToken: await this.getAccessToken(authUser),
    };
  }

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const password = await this.bcryptService.hash(registerDto.password);

    const user = await this.usersService.create({
      ...registerDto,
      password,
    });

    return {
      accessToken: await this.getAccessToken(user),
    };
  }

  async validateAccessToken(accessToken: string): Promise<CurrentUser> {
    return this.jwtService.verifyAsync<CurrentUser>(accessToken);
  }

  private async getAccessToken({
    id,
    username,
  }: {
    id: string;
    username: string;
  }): Promise<string> {
    const payload: CurrentUser = { sub: id, username };

    return this.jwtService.signAsync(payload);
  }
}
