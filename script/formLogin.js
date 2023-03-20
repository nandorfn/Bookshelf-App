function showLogin() {
    Swal.fire({
        title: 'Login',
        html:
            '<form class="form-group mt-2">' +
            
            '<div class="mb-3">' +
            '<label for="swal-input1" class="form-label">Username</label>' +
            '<input type="text" class="form-control" id="swal-input1" aria-describedby="titleHelp" placeholder="Input Username">' +
            '</div>' +
            
            '<div class="mb-3">' +
            '<label for="swal-input2" class="form-label">Password</label>' +
            '<input type="password" class="form-control" id="swal-input2" placeholder="Input Password">' +
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
            const username = Swal.getPopup().querySelector('#swal-input1').value
            const password = Swal.getPopup().querySelector('#swal-input2').value
            return { username: username, password: password }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Login Success',
                html: `<p>Welcome ${result.value.username}</p>`,
                icon: 'success',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-lg m-2'
                },
            })
        }
    })
}