import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entitys';
import { EncryptionUtil } from 'src/utils';
import { AuthDto } from 'src/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private invalidTokens: Set<string> = new Set();
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(authDto: AuthDto): Promise<{accessToken: string, email:string}> {
        const username = authDto.username;
        const password = authDto.password;

        const user = await this.userRepository.findOne({ where: { username} });
        if(!user) throw new NotFoundException('Usuario no encontrado');

        const isPasswordValid = await EncryptionUtil.comparePasswords(password, user.password);
        if(!isPasswordValid) throw new NotFoundException('Credenciales inválidas');

        const token = { name: user.username, rol: user.rol };
        const accessToken = this.jwtService.sign(token);
        const email = user.email;
        
        return { accessToken, email };
    }

    async invalidateToken(token: string): Promise<void> {
        this.invalidTokens.add(token);
    }

    async isTokenInvalid(token: string): Promise<boolean> {
        return this.invalidTokens.has(token);
    }
}
