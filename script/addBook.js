function showForm() {
    Swal.fire({
        title: 'Add Book',
        html:
            '<form class="form-group mt-2">' +
            '<div class="mb-3">' +
            '<label for="swal-input1" class="form-label">Title</label>' +
            '<input type="text" class="form-control" id="swal-input1" aria-describedby="titleHelp">' +
            '</div>' +
            '<div class="mb-3">' +
            '<label for="swal-input2" class="form-label">Author</label>' +
            '<input type="text" class="form-control" id="swal-input2">' +
            '</div>' +
            '<div class="mb-3">' +
            '<label class="form-label" for="swal-input3">Year</label>' +
            '<input type="number" class="form-control" id="swal-input3">' +
            '</div>' +
            '</form>',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        customClass: {
            confirmButton: 'btn btn-primary btn-lg m-2',
            cancelButton: 'btn btn-danger btn-lg m-2'
        },
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#swal-input1').value
            const author = Swal.getPopup().querySelector('#swal-input2').value
            const bookYear = Swal.getPopup().querySelector('#swal-input3').value
            return { name: name, author: author, bookYear: bookYear }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Submitted',
                html: `<p>Name: ${result.value.name}</p>` +
                        `<p>Author: ${result.value.author}</p>` +
                        `<p>Year: ${result.value.bookYear}</p>`,
                icon: 'success',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg m-2'
                },
            })
        }
    })
}