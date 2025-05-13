import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    try {
      return this.userService.createUser(userDto);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('info')
  @Redirect('/api/auth/profile', 302) // http状态码，GET-301永久重定向，302临时重定向
  info() {
    return;
  }
  @Public()
  @Post('login')
  @Redirect('/api/auth/login', 307) // http状态码，POST-308永久重定向，307临时重定向
  login() {
    return;
  }
}
