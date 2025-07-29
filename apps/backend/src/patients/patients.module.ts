import { Module } from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { PateintsController } from "./patients.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [PatientsService, PrismaService],
  controllers: [PateintsController],
  exports: [PatientsService],
})
export class PatientsModule {}
