import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientsService } from "./patients.service";
import { Patient } from "@prisma/client";

@Controller("patients")
export class PateintsController {
  constructor(private patientService: PatientsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Patient[]> {
    return this.patientService.fetchAllPatients();
  }

  @Put(":id")
  async editPatient(
    @Param("id") id: string,
    @Body() patientData: Partial<Patient>
  ): Promise<Patient> {
    return this.patientService.updatePatientById({
      where: { id: Number(id) },
      data: patientData,
    });
  }

  @Delete(":id")
  async deletePatient(@Param("id") id: String): Promise<{ id: Number }> {
    return this.patientService.deletePatientById({
      where: {
        id: Number(id),
      },
    });
  }
}
