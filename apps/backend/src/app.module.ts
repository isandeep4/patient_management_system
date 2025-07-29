import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";
import { UsersModule } from "./users/users.module";
import { PatientsModule } from "./patients/patients.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PatientsModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
