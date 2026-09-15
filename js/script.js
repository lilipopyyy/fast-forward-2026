const form = document.getElementById('formDaftar');
const nama = document.getElementById('nama');
const email = document.getElementById('email');
const kelas = document.getElementById('kelas');
const jurusan = document.getElementById('jurusan');
const kegiatan = document.getElementById('kegiatan');
const setuju = document.getElementById('setuju');
const btnDaftar = document.getElementById('btnDaftar');
const hasil = document.getElementById('hasil');

const errorNama = document.getElementById('errorNama');
const errorEmail = document.getElementById('errorEmail');
const errorSetuju = document.getElementById('errorSetuju');

// Checkbox persetujuan
setuju.addEventListener('change', function () {
    btnDaftar.disabled = !setuju.checked;
});

// Validasi nama
nama.addEventListener('input', function () {
    errorNama.textContent = '';
    nama.classList.remove('input-error');
});

// Validasi email
email.addEventListener('input', function () {
    errorEmail.textContent = '';
    email.classList.remove('input-error');
});

// Submit form
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    errorNama.textContent = '';
    errorEmail.textContent = '';
    errorSetuju.textContent = '';

    nama.classList.remove('input-error');
    email.classList.remove('input-error');

    // Cek nama
    if (nama.value.trim().length < 3) {
        errorNama.textContent = 'Nama minimal 3 karakter.';
        nama.classList.add('input-error');
        valid = false;
    }

    // Cek email
    if (!email.value.includes('@')) {
        errorEmail.textContent = 'Email harus mengandung karakter "@".';
        email.classList.add('input-error');
        valid = false;
    }

    // Cek persetujuan
    if (!setuju.checked) {
        errorSetuju.textContent = 'Anda harus menyetujui persyaratan.';
        valid = false;
    }

    // Kalau tidak valid
    if (!valid) {
        return;
    }

    // Kalau berhasil
    hasil.innerHTML =
        'Pendaftaran berhasil!<br>' +
        'Nama: ' + nama.value + '<br>' +
        'Email: ' + email.value + '<br>' +
        'Kelas: ' + kelas.value + '<br>' +
        'Jurusan: ' + jurusan.value + '<br>' +
        'Kegiatan: ' + kegiatan.value;

    hasil.className = 'success';

    // Simpan nama
    localStorage.setItem('nama_siswa', nama.value);

    // Reset form
    form.reset();

    // Tombol kembali disabled
    btnDaftar.disabled = true;
});

console.log(localStorage.getItem('nama_siswa'));
// Mengaktifkan tombol daftar ketika checkbox persetujuan dicentang
setuju.addEventListener('change', function () {
    btnDaftar.disabled = !setuju.checked;
});