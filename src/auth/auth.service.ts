import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUser, AdminUserDocument } from './admin-user.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUserDocument>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Seed initial admin
    const adminExists = await this.adminUserModel.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await this.adminUserModel.create({ email: 'admin@example.com', passwordHash });
      console.log('Seeded initial admin user: admin@example.com / admin123');
    }
  }

  async login(email: string, pass: string) {
    const user = await this.adminUserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
