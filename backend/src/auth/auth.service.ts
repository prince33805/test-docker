import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            return await this.prisma.user.create({ data: createUserDto });
        } catch (error) {
            throw new HttpException('Database created failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateUser(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: createUserDto.email },
            });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            if (createUserDto.password !== user.password) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload = { sub: user.id, email: user.email, role: user.role };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        } catch (error) {
            throw new HttpException(`validateUser failed ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
