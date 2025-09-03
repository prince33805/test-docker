import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async create(@Body(new ValidationPipe()) body: CreateUserDto) {
    return await this.authService.create(body);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto,) {
    return await this.authService.validateUser(createUserDto);
  }

  // @Post('sign')
  // async sign(@Body() createUserDto: CreateUserDto, @Res() res) {
  //   const user = await this.authService.createUser(createUserDto);
  //   const payload = { sub: user.id, email: user.email };
  //   const token = this.jwtService.sign(payload);
  //   return res.json({ token });
  // }

}
