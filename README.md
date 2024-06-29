<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# ERD untuk ERP Manajemen Rumah Sakit

Diagram ini menggambarkan Entity-Relationship Diagram (ERD) untuk sistem manajemen rumah sakit. Sistem ini mencakup berbagai entitas yang penting untuk pengelolaan rumah sakit, termasuk pasien, dokter, perawat, janji temu, rawat inap, kamar, obat, resep, resep detail, dan tagihan.

## Entitas dan Atribut

### 1. Pasien
- **ID Pasien**: int
- **Nama**: string
- **Alamat**: string
- **Tanggal Lahir**: date
- **Jenis Kelamin**: string
- **Nomor Telepon**: string

### 2. Dokter
- **ID Dokter**: int
- **Nama**: string
- **Spesialisasi**: string
- **Nomor Telepon**: string
- **Alamat Email**: string

### 3. Perawat
- **ID Perawat**: int
- **Nama**: string
- **Shift**: string
- **Nomor Telepon**: string
- **Alamat Email**: string

### 4. Janji Temu
- **ID Janji Temu**: int
- **ID Pasien**: int
- **ID Dokter**: int
- **Tanggal**: date
- **Waktu**: time

### 5. Rawat Inap
- **ID Rawat Inap**: int
- **ID Pasien**: int
- **ID Kamar**: int
- **Tanggal Masuk**: date
- **Tanggal Keluar**: date

### 6. Kamar
- **ID Kamar**: int
- **Jenis Kamar**: string
- **Tarif Per Hari**: decimal

### 7. Obat
- **ID Obat**: int
- **Nama Obat**: string
- **Deskripsi**: string
- **Harga**: decimal

### 8. Resep
- **ID Resep**: int
- **ID Pasien**: int
- **ID Dokter**: int
- **Tanggal**: date
- **Total Harga**: decimal

### 9. Resep Detail
- **ID Resep**: int
- **ID Obat**: int
- **Jumlah**: int
- **Harga**: decimal

### 10. Tagihan
- **ID Tagihan**: int
- **ID Pasien**: int
- **Tanggal**: date
- **Total Jumlah**: decimal

## Hubungan Antar Entitas

- **Pasien** `1:N` **Janji Temu**
- **Dokter** `1:N` **Janji Temu**
- **Pasien** `1:N` **Rawat Inap**
- **Kamar** `1:N` **Rawat Inap**
- **Pasien** `1:N` **Resep**
- **Dokter** `1:N` **Resep**
- **Resep** `1:N` **Resep Detail**
- **Obat** `1:N` **Resep Detail**
- **Pasien** `1:N` **Tagihan**

## Diagram ERD

![ERD Hospital Management System](ERD_Hospital_Management_System.png)

### Penjelasan Hubungan
1. **Pasien dan Janji Temu**: Seorang pasien dapat memiliki banyak janji temu, dan setiap janji temu dihadiri oleh satu pasien dan satu dokter.
2. **Pasien dan Rawat Inap**: Seorang pasien dapat dirawat di banyak kamar (berbeda waktu), dan setiap kamar dapat menampung banyak pasien (berbeda waktu).
3. **Pasien dan Resep**: Seorang pasien dapat memiliki banyak resep yang diberikan oleh dokter.
4. **Resep dan Resep Detail**: Setiap resep dapat terdiri dari banyak obat.
5. **Pasien dan Tagihan**: Seorang pasien dapat memiliki banyak tagihan yang terkait dengan perawatan dan pengobatan yang mereka terima.

## Cara Membaca Diagram

- Kotak mewakili entitas.
- Setiap entitas memiliki atribut yang tercantum di dalamnya.
- Garis penghubung antara entitas menunjukkan hubungan antara mereka, dengan simbol `1` dan `N` yang menunjukkan kardinalitas (misalnya, `1:N` untuk satu ke banyak).

## Contoh Visual

Untuk visualisasi diagram, gunakan alat seperti draw.io, Lucidchart, atau alat diagram lainnya untuk menggambar entitas sebagai kotak dan hubungkan dengan garis yang menunjukkan hubungan antar entitas.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
