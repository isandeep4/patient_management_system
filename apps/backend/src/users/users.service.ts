import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
  async findById(userId: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }
  async fetchAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
