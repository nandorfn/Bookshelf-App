const deleteBtn = document.getElementById('delete-btn');

// Tambahkan event listener ke elemen tombol delete
deleteBtn.addEventListener('click', function () {
    // Ambil ID dari atribut data-id pada elemen
    const bookId = deleteBtn.getAttribute('data-id');

    // Kirim request DELETE ke server dengan menggunakan package axios
    axios.delete(`/books/${bookId}`)
        .then(response => {
            // Jika request berhasil, hapus elemen dari halaman
            if (response.status === 200) {
                const bookCard = deleteBtn.closest('.card');
                bookCard.parentNode.removeChild(bookCard);

            }
        })
        .catch(error => console.log(error));
});

const restoreBtn = document.getElementById('restore-btn');

deleteBtn.addEventListener('click', function () {

    const bookId = deleteBtn.getAttribute('data-id');

    // Kirim request DELETE ke server dengan menggunakan package axios
    axios.delete(`/books/${bookId}`)
        .then(response => {
            // Jika request berhasil, hapus elemen dari halaman
            if (response.status === 200) {
                const bookCard = deleteBtn.closest('.card');
                bookCard.parentNode.removeChild(bookCard);

            }
        })
        .catch(error => console.log(error));
});