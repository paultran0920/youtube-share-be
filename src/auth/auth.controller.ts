import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccountEntity } from 'src/account/entities/account.entity';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dtos/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout() {
    // logout current user
  }

  @Post('auth/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.logger.log('AuthController -> forgotPassword start.');
    this.logger.debug('AuthController -> ', forgotPasswordDto);
    try {
      await this.authService.generateResetPasswordLink(
        forgotPasswordDto.username,
      );
      this.logger.log('AuthController -> forgotPassword end.');
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('auth/reset-password/:token')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    this.logger.log('AuthController -> resetPassword start.');
    try {
      await this.authService.resetPassword(token, resetPasswordDto.password);
      this.logger.log('AuthController -> resetPassword end.');
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    this.logger.log('AuthController -> changePassword start.');
    try {
      const user = req.user as AccountEntity;
      await this.authService.changePassword(
        user.email,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword,
      );
      this.logger.log('AuthController -> changePassword end.');
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
}
