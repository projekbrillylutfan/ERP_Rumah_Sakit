-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(255) NULL,
    `tanggalLahir` DATETIME(3) NULL,
    `jenisKelamin` ENUM('LAKI_LAKI', 'PEREMPUAN') NOT NULL,
    `nomorTelepon` VARCHAR(20) NOT NULL,
    `alamatEmail` VARCHAR(100) NULL,
    `spesialisasi` VARCHAR(100) NULL,
    `shift` ENUM('PAGI', 'SIANG', 'MALAM') NULL,
    `peran` ENUM('PASIEN', 'DOKTER', 'PERAWAT', 'ADMIN') NOT NULL DEFAULT 'PASIEN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `janji_temu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pasienId` INTEGER NOT NULL,
    `dokterId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rawat_inap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pasienId` INTEGER NOT NULL,
    `kamarId` INTEGER NOT NULL,
    `tanggalMasuk` DATETIME(3) NOT NULL,
    `tanggalKeluar` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jenisKamar` VARCHAR(100) NOT NULL,
    `tarifPerHari` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `obat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaObat` VARCHAR(100) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `harga` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pasienId` INTEGER NOT NULL,
    `dokterId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `totalHarga` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resep_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resepId` INTEGER NOT NULL,
    `obatId` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `harga` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tagihan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pasienId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `totalJumlah` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `janji_temu` ADD CONSTRAINT `janji_temu_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `janji_temu` ADD CONSTRAINT `janji_temu_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawat_inap` ADD CONSTRAINT `rawat_inap_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rawat_inap` ADD CONSTRAINT `rawat_inap_kamarId_fkey` FOREIGN KEY (`kamarId`) REFERENCES `kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_dokterId_fkey` FOREIGN KEY (`dokterId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep_detail` ADD CONSTRAINT `resep_detail_resepId_fkey` FOREIGN KEY (`resepId`) REFERENCES `resep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep_detail` ADD CONSTRAINT `resep_detail_obatId_fkey` FOREIGN KEY (`obatId`) REFERENCES `obat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tagihan` ADD CONSTRAINT `tagihan_pasienId_fkey` FOREIGN KEY (`pasienId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
