import { Module } from "@nestjs/common";
import { PateintsController } from "./patients/patients.controller";
import { PatientsService } from "./patients/patients.service";

@Module({
  controllers: [PateintsController],
  providers: [PatientsService],
})
export class AppModule {}
