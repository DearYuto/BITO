import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

type UserRecord = {
  email: string;
  passwordHash: string;
};

@Injectable()
export class AuthService {
  private readonly users = new Map<string, UserRecord>();

  constructor(private readonly jwtService: JwtService) {}

  async signup(email: string, password: string): Promise<{ accessToken: string }> {
    if (this.users.has(email)) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    this.users.set(email, { email, passwordHash });

    return this.signToken(email);
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = this.users.get(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.email);
  }

  private signToken(email: string): { accessToken: string } {
    return { accessToken: this.jwtService.sign({ email }) };
  }
}
