// import { Patient } from "src/patients/interfaces/patient.interface";
import { Injectable } from "@nestjs/common";
import { Patient, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async createPatient(data: Prisma.PatientCreateInput): Promise<Patient> {
    return this.prisma.patient.create({
      data,
    });
  }

  async fetchAllPatients() {
    return this.prisma.patient.findMany();
  }

  async updatePatientById(params: {
    where: Prisma.PatientWhereUniqueInput;
    data: Prisma.PatientUpdateInput;
  }): Promise<Patient> {
    const { where, data } = params;
    return await this.prisma.patient.update({
      where,
      data,
    });
  }
  async deletePatientById(params: {
    where: Prisma.PatientWhereUniqueInput;
  }): Promise<{ id: number }> {
    return await this.prisma.patient.delete({
      where: params.where,
    });
  }
}
