import { Injectable } from "@nestjs/common";
import { Patient } from "src/patients/interfaces/patient.interface";

@Injectable()
export class PatientsService {
  private readonly patients: Patient[] = [];

  create(patient: Patient) {
    this.patients.push(patient);
  }

  findAll() {
    return this.patients;
  }
}
