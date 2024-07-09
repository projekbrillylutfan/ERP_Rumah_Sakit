export class CreateRawatInapRequest {
  pasienId: number;
  kamarId: number;
  tanggalMasuk: Date;
  tanggalKeluar: Date;
}

export class RawatInapResponse {
  id: number;
  pasienId: number;
  kamarId: number;
  tanggalMasuk: Date;
  tanggalKeluar: Date;
  createdBy?: string;
  updatedBy?: string;
}
