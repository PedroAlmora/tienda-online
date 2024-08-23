import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/entitys";
import { CreateUserDto, UpdateUserDto, UserDto } from "src/dto";
import { EncryptionUtil } from "src/utils";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAllUser(): Promise<UserDto[]> {
        const result = await this.usersRepository.find();

        const data: UserDto[] = result.map(user => ({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            rol: user.rol
        }))

        return data;
    }

    async findByIdUser(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`No hay usuario con id ${id}`);
        }
        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...userData } = createUserDto;
        const hashedPassword = await EncryptionUtil.hashPassword(password)

        const newUser = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
            dateJoined: new Date(),
            isActive: true,
            isStaff: true,
            isSuperuser: false,
            rol: 'cliente'
        });

        return await this.usersRepository.save(newUser);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const { password, ...rest } = updateUserDto;
        const user = await this.findByIdUser(id);

        if (password) {
            const hashedPassword = await EncryptionUtil.hashPassword(password);
            user.password = hashedPassword
        }

        Object.assign(user, rest);
        return await this.usersRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.findByIdUser(id);
        await this.usersRepository.remove(user);
    }
}