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
            
            '<div class="mb-3">' +
            '<label class="form-label" for="swal-input4">Status</label>' +
            '<select class="form-select" id="swal-input4" name="status">' +
                '<option value="true">Already Read</option>' +
                '<option value="false">Being Read</option>' +
            '</select>' +
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
        preConfirm: function inputData() {
            const title = Swal.getPopup().querySelector('#swal-input1').value
            const author = Swal.getPopup().querySelector('#swal-input2').value
            const year = Swal.getPopup().querySelector('#swal-input3').value
            const status = Swal.getPopup().querySelector('#swal-input4').value

            return { title: title, author: author, year: year, status: status }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const data = result.value;

            fetch('/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                
            }).then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: 'Submitted',
                        html: `<p>Name: ${data.title}</p>` +
                            `<p>Author: ${data.author}</p>` +
                            `<p>Year: ${data.year}</p>`,
                        icon: 'success',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn btn-primary btn-lg m-2'
                        },
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to submit book',
                        icon: 'error',
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: 'btn btn-primary btn-lg m-2'
                        },
                    });
                }
                setTimeout(() => {
                        location.href = ('/')
                }, "2000");
                
            }).catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to submit book',
                    icon: 'error',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-primary btn-lg m-2'
                    },
                });
            });
        }
    });
}
