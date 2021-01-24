import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Auth' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  auth(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Sign Up' })
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<void> {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Sign In' })
  @UseGuards(DoesUserExist)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }
}
