import { Module } from "@nestjs/common";
import { PateintsController } from "./patients/patients.controller";
import { PatientsService } from "./patients/patients.service";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PateintsController],
  providers: [PatientsService, PrismaService],
})
export class AppModule {}
