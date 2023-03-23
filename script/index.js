const deleteBtns = document.querySelectorAll('.delete-btn');

deleteBtns.forEach(deleteBtn => {
    // Tambahkan event listener ke setiap elemen tombol delete
    deleteBtn.addEventListener('click', function () {
        // Ambil ID dari atribut data-id pada elemen
        const bookId = deleteBtn.getAttribute('data-id');
        console.log(bookId);

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
            setTimeout(() => {
                window.location.reload();
        }, "500");
            
    });
});


const restoreBtns = document.querySelectorAll('.restore-btn');

restoreBtns.forEach(restoreBtn => {
    restoreBtn.addEventListener('click', function () {
        const bookId = restoreBtn.getAttribute('data-id');

        axios.post(`/books/${bookId}`)
            .then(response => {
                // Jika request berhasil, update book.status value
                if (response.status === 200) {
                    const bookCard = restoreBtn.closest('.card');
                    bookCard.remove();
                    
                }
            })
            .catch(error => console.error(error));
            setTimeout(() => {
                window.location.reload();
        }, "500");
            
    });
});
