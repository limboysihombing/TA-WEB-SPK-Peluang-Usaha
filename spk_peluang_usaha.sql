-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Jul 2020 pada 06.22
-- Versi server: 10.1.37-MariaDB
-- Versi PHP: 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spk_peluang_usaha`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(5) NOT NULL,
  `nama_admin` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `nama_admin`, `email`, `password`, `gambar`) VALUES
(12345, 'admin', 'admin@mail.com', 'admin', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` varchar(10) NOT NULL,
  `nama_pengguna` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `gambar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama_pengguna`, `email`, `password`, `gambar`) VALUES
('OAk5R9T2GN', 'user', 'user@mail.com', 'user', ''),
('wkMtjngJKz', 'Master Sihombing', 'master@mail.com', 'sihombing', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `usaha`
--

CREATE TABLE `usaha` (
  `id_usaha` varchar(10) NOT NULL,
  `nama_usaha` varchar(20) NOT NULL,
  `jenis_usaha` varchar(20) NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `modal` int(9) NOT NULL,
  `deskripsi_usaha` varchar(250) NOT NULL,
  `bahan_baku` varchar(250) NOT NULL,
  `target_pasar` varchar(100) NOT NULL,
  `kepadatan_penduduk` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `usaha`
--

INSERT INTO `usaha` (`id_usaha`, `nama_usaha`, `jenis_usaha`, `gambar`, `modal`, `deskripsi_usaha`, `bahan_baku`, `target_pasar`, `kepadatan_penduduk`) VALUES
('-kIZvzB6Iv', 'Usaha Fotokopy dan P', 'Jasa', 'gambarBiasar', 19675000, 'ksdf\r\nfsdkj\r\ns', 'afsdjkl\r\nlsdkfj\r\n', 'Sekolah, Kampus, Perumahan, Perkantoran', '1'),
('0mioEjiGrB', 'Usaha Ikan Hias', 'Penjualan', 'gambarBiasar', 49364200, '', '', 'Perumahan, sekolah, kampus', '1'),
('6ikdrMESoL', 'Usaha Tanaman Hias', 'Perdagangan', 'gambarBiasar', 5500000, '-', '-', 'perumahan', '1'),
('JvOJW20hoJ', 'Usaha Peternakan Aya', 'Peternakan', 'gambarBiasar', 13911500, '', '', 'Pasar, Restoran, Toko Sembako', '0'),
('LQMBMDHL-t', 'Usaha Peternakan Aya', 'Peternakan', 'gambarBiasar', 13160000, '', '', 'Pasar, Restoran, Toko Sembako', '0'),
('Ok0IBbAsXu', 'Usaha Eskristal', 'ENtah apa', 'gambarBiasar', 51668000, '', '', 'Restoran, Perumahan', '1'),
('p-ojnLrA1s', 'Jajanan Pasar', 'Kuliner', 'gambarBiasar', 4587500, '', '', 'Pasar, Sekolah, Kampus, Perkantoran, Perumahan', '1'),
('pE1rZY33Kh', 'Usaha Perfume', 'abcd', 'gambarBiasar', 15000000, '', '', 'pasar, perumahan, kampus', '1'),
('q3WVsRZlYp', 'Usaha Rental Kompute', 'Rental', 'gambarBiasar', 16320000, '', '', 'Sekolah, Kampus, Perumahan', '1'),
('TU_gPWj4Ms', 'Usaha Minimarket', 'Penjualan', 'gambarBiasar', 199820000, '', '', 'Pasar, Perumahan, Kampus', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `usaha_tersimpan`
--

CREATE TABLE `usaha_tersimpan` (
  `id_usaha_tersimpan` varchar(10) NOT NULL,
  `id_usaha` varchar(10) NOT NULL,
  `id_pengguna` varchar(10) NOT NULL,
  `id_wilayah` varchar(10) NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wilayah`
--

CREATE TABLE `wilayah` (
  `id_wilayah` varchar(10) NOT NULL,
  `nama_wilayah` varchar(50) DEFAULT NULL,
  `kepadatan_penduduk` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `wilayah`
--

INSERT INTO `wilayah` (`id_wilayah`, `nama_wilayah`, `kepadatan_penduduk`) VALUES
('1237', '1278', 28),
('1245', 'Medan Amplas', 21678),
('16789', 'Padang Bulan', 261290),
('CCM8FTDoS5', 'Medan Selayang', 2156789),
('DFxrDDaNPW', 'Medan Selayang', 1),
('q6nHImZ-y0', 'Medan Selayang', 126789);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`);

--
-- Indeks untuk tabel `usaha`
--
ALTER TABLE `usaha`
  ADD PRIMARY KEY (`id_usaha`);

--
-- Indeks untuk tabel `usaha_tersimpan`
--
ALTER TABLE `usaha_tersimpan`
  ADD KEY `FK_USAHA` (`id_usaha`),
  ADD KEY `FK_PENGGUNA` (`id_pengguna`),
  ADD KEY `FK_WILAYAH` (`id_wilayah`);

--
-- Indeks untuk tabel `wilayah`
--
ALTER TABLE `wilayah`
  ADD PRIMARY KEY (`id_wilayah`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `usaha_tersimpan`
--
ALTER TABLE `usaha_tersimpan`
  ADD CONSTRAINT `FK_PENGGUNA` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USAHA` FOREIGN KEY (`id_usaha`) REFERENCES `usaha` (`id_usaha`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_WILAYAH` FOREIGN KEY (`id_wilayah`) REFERENCES `wilayah` (`id_wilayah`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
