export class CreateKamarRequest {
  jenisKamar: string;
  tarifPerHari: number;
}

export class KamarResponse {
  id: number;
  jenisKamar: string;
  tarifPerHari: number;
  createdBy?: string;
  updatedBy?: string;
}

export class GetKamarById {
  id: number;
}

export class UpdateKamarRequest {
  id: number;
  jenisKamar: string;
  tarifPerHari: number;
}

export class DeleteKamarRequest {
  id: number;
}
