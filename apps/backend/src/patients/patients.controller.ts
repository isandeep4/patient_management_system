import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientsService } from "./patients.service";
import { Patient } from "./interfaces/patient.interface";

@Controller("patients")
export class PateintsController {
  constructor(private patientService: PatientsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createPatientDto: CreatePatientDto) {
    this.patientService.create(createPatientDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}
