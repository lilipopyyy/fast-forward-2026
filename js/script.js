let daftarPendaftar = JSON.parse(
    localStorage.getItem("daftarPendaftar")
) || [];


/* =========================
   BAGIAN FORM PENDAFTARAN
   ========================= */

const form = document.getElementById("formDaftar");

if (form) {

    const nama = document.getElementById("nama");
    const email = document.getElementById("email");
    const kelas = document.getElementById("kelas");
    const jurusan = document.getElementById("jurusan");
    const kegiatan = document.getElementById("kegiatan");
    const setuju = document.getElementById("setuju");
    const btnDaftar = document.getElementById("btnDaftar");
    const hasil = document.getElementById("hasil");

    const errorNama = document.getElementById("errorNama");
    const errorEmail = document.getElementById("errorEmail");
    const errorSetuju = document.getElementById("errorSetuju");


    setuju.addEventListener("change", function () {

        btnDaftar.disabled = !setuju.checked;

    });


    nama.addEventListener("input", function () {

        errorNama.textContent = "";
        nama.classList.remove("input-error");

    });


    email.addEventListener("input", function () {

        errorEmail.textContent = "";
        email.classList.remove("input-error");

    });


    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;


        errorNama.textContent = "";
        errorEmail.textContent = "";
        errorSetuju.textContent = "";

        nama.classList.remove("input-error");
        email.classList.remove("input-error");


        // Validasi nama
        if (nama.value.trim().length < 3) {

            errorNama.textContent =
                "Nama minimal 3 karakter.";

            nama.classList.add("input-error");

            valid = false;
        }


        // Validasi email
        if (!email.value.includes("@")) {

            errorEmail.textContent =
                'Email harus mengandung karakter "@".';

            email.classList.add("input-error");

            valid = false;
        }


        // Validasi persetujuan
        if (!setuju.checked) {

            errorSetuju.textContent =
                "Anda harus menyetujui persyaratan.";

            valid = false;
        }


        if (!valid) {
            return;
        }


        // Membuat data peserta baru
        let siswaBaru = {

            id: Date.now(),

            nama: nama.value.trim(),

            email: email.value.trim(),

            kelas: kelas.value,

            jurusan: jurusan.value,

            kegiatan: kegiatan.value.trim(),

            status: "Menunggu"

        };


        // Menambahkan data ke array
        daftarPendaftar.push(siswaBaru);


        // Menyimpan data ke localStorage
        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );


        // Menampilkan pesan berhasil
        hasil.innerHTML =
            "Pendaftaran berhasil!<br>" +
            "Nama: " + siswaBaru.nama + "<br>" +
            "Email: " + siswaBaru.email + "<br>" +
            "Kelas: " + siswaBaru.kelas + "<br>" +
            "Jurusan: " + siswaBaru.jurusan + "<br>" +
            "Kegiatan: " + siswaBaru.kegiatan;

        hasil.className = "success";


        // Mengosongkan form
        form.reset();

        btnDaftar.disabled = true;

    });

}


/* =========================
   BAGIAN DASHBOARD
   ========================= */

const tabelPeserta = document.getElementById("tabelPeserta");

if (tabelPeserta) {

    tabelPeserta.innerHTML = "";

    const pesanKosong = document.getElementById("pesanKosong");


    if (daftarPendaftar.length === 0) {

        if (pesanKosong) {
            pesanKosong.style.display = "block";
        }

    } else {

        if (pesanKosong) {
            pesanKosong.style.display = "none";
        }


        for (let i = 0; i < daftarPendaftar.length; i++) {

            let data = daftarPendaftar[i];

            let baris = document.createElement("tr");


            baris.innerHTML =
                "<td>" + (i + 1) + "</td>" +
                "<td>" + data.nama + "</td>" +
                "<td>" + data.email + "</td>" +
                "<td>" + data.kelas + "</td>" +
                "<td>" + data.jurusan + "</td>" +
                "<td>" + data.kegiatan + "</td>" +
                "<td>" + data.status + "</td>" +
                "<td>" +
                    "<button type='button'>Edit</button> " +
                    "<button type='button'>Hapus</button>" +
                "</td>";


            tabelPeserta.appendChild(baris);

        }

    }

}