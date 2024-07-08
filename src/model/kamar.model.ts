export class CreateKamarRequest {
  jenisKamar: string;
  tarifPerHari: number;
}

export class KamarResponse {
  jenisKamar: string;
  tarifPerHari: number;
  createdBy?: string;
  updatedBy?: string;
}
