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

    const pesanKosong = document.getElementById("pesanKosong");


    /* POPUP EDIT */

    const popupEdit = document.getElementById("popupEdit");

    const editNama = document.getElementById("editNama");
    const editEmail = document.getElementById("editEmail");
    const editKelas = document.getElementById("editKelas");
    const editJurusan = document.getElementById("editJurusan");
    const editKegiatan = document.getElementById("editKegiatan");
    const editStatus = document.getElementById("editStatus");

    const btnSimpanEdit = document.getElementById("btnSimpanEdit");
    const btnBatalEdit = document.getElementById("btnBatalEdit");

    let idYangDiedit = null;


    /* POPUP HAPUS */

    const popupHapus = document.getElementById("popupHapus");

    const btnOkeHapus = document.getElementById("btnOkeHapus");
    const btnBatalHapus = document.getElementById("btnBatalHapus");

    let idYangDihapus = null;


    /* =========================
       MENAMPILKAN DATA
       ========================= */

    function tampilkanData() {

        tabelPeserta.innerHTML = "";


        if (daftarPendaftar.length === 0) {

            pesanKosong.style.display = "block";

        } else {

            pesanKosong.style.display = "none";


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
                        "<button type='button' class='btn-edit' data-id='" + data.id + "'>Edit</button> " +
                        "<button type='button' class='btn-hapus' data-id='" + data.id + "'>Hapus</button>" +
                    "</td>";


                tabelPeserta.appendChild(baris);

            }


            /* =========================
               TOMBOL EDIT
               ========================= */

            const tombolEdit =
                document.querySelectorAll(".btn-edit");


            for (let i = 0; i < tombolEdit.length; i++) {

                tombolEdit[i].addEventListener("click", function () {

                    let id =
                        Number(this.getAttribute("data-id"));


                    for (let j = 0; j < daftarPendaftar.length; j++) {

                        if (daftarPendaftar[j].id === id) {

                            let data = daftarPendaftar[j];

                            idYangDiedit = id;


                            editNama.value = data.nama;

                            editEmail.value = data.email;

                            editKelas.value = data.kelas;

                            editJurusan.value = data.jurusan;

                            editKegiatan.value = data.kegiatan;


                            if (data.status === "Menunggu") {

                                editStatus.value = "Pending";

                            } else {

                                editStatus.value = data.status;

                            }


                            popupEdit.style.display = "flex";

                            break;
                        }

                    }

                });

            }


            /* =========================
               TOMBOL HAPUS
               ========================= */

            const tombolHapus =
                document.querySelectorAll(".btn-hapus");


            for (let i = 0; i < tombolHapus.length; i++) {

                tombolHapus[i].addEventListener("click", function () {

                    let id =
                        Number(this.getAttribute("data-id"));


                    idYangDihapus = id;


                    // Menampilkan popup konfirmasi
                    popupHapus.style.display = "flex";

                });

            }

        }

    }


    /* Menampilkan data pertama kali */

    tampilkanData();


    /* =========================
       SIMPAN EDIT
       ========================= */

    btnSimpanEdit.addEventListener("click", function () {

        for (let i = 0; i < daftarPendaftar.length; i++) {

            if (daftarPendaftar[i].id === idYangDiedit) {

                daftarPendaftar[i].nama =
                    editNama.value.trim();

                daftarPendaftar[i].email =
                    editEmail.value.trim();

                daftarPendaftar[i].kelas =
                    editKelas.value;

                daftarPendaftar[i].jurusan =
                    editJurusan.value;

                daftarPendaftar[i].kegiatan =
                    editKegiatan.value.trim();

                daftarPendaftar[i].status =
                    editStatus.value;

                break;
            }

        }


        // Menyimpan perubahan
        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );


        // Menutup popup
        popupEdit.style.display = "none";


        // Menampilkan data terbaru
        tampilkanData();

    });


    /* =========================
       BATAL EDIT
       ========================= */

    btnBatalEdit.addEventListener("click", function () {

        popupEdit.style.display = "none";

    });


    /* =========================
       OKE HAPUS
       ========================= */

    btnOkeHapus.addEventListener("click", function () {

        for (let i = 0; i < daftarPendaftar.length; i++) {

            if (daftarPendaftar[i].id === idYangDihapus) {

                // Menghapus data dari array
                daftarPendaftar.splice(i, 1);

                break;
            }

        }


        // Menyimpan array terbaru ke localStorage
        localStorage.setItem(
            "daftarPendaftar",
            JSON.stringify(daftarPendaftar)
        );


        // Menutup popup
        popupHapus.style.display = "none";


        // Menampilkan tabel terbaru
        tampilkanData();

    });


    /* =========================
       BATAL HAPUS
       ========================= */

    btnBatalHapus.addEventListener("click", function () {

        popupHapus.style.display = "none";

    });

}