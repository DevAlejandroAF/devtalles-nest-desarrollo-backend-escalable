import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import type { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @Auth(ValidRoles.superUser, ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  // WARN: ESTA ES UNA VARIACIÓN!
  @Get('private2')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @Headers() headers: IncomingHttpHeaders,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: true,
      message: 'Hello, World! Private',
      requestUser: request.user,
      headers,
      user,
      userEmail,
      rawHeaders,
    };
  }

  // WARN: UNICAMENTE ACADEMICO!
  //@SetMetadata('roles', ['admin', 'super-user'])
  @Get('private3')
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
