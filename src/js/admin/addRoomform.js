document.getElementById('addRoomModal').addEventListener('hidden.bs.modal', function () {
    const form = document.getElementById('addRoomForm');
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('formFeedback').classList.add('d-none');
    document.getElementById('previewImage').classList.add('d-none');
    document.getElementById('previewImage').src = '';
    });

    document.getElementById('roomImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage');
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.classList.add('d-none');
        previewImage.src = '';
    }
    });

    document.getElementById('addRoomForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = this;
    const feedback = document.getElementById('formFeedback');
    const roomNumber = document.getElementById('roomNumber').value.trim();
    const roomStatus = document.getElementById('roomStatus').value;
    const roomImage = document.getElementById('roomImage').files[0];

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        feedback.classList.remove('d-none');
        feedback.classList.add('alert-danger');
        feedback.textContent = 'Please fill out all required fields.';
        return;
    }

    const roomData = {
        roomNumber,
        roomStatus,
        roomImage: roomImage ? roomImage.name : null
    };
    console.log('New Room:', roomData);

    feedback.classList.remove('d-none', 'alert-danger');
    feedback.classList.add('alert-success');
    feedback.textContent = 'Room added successfully!';

    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('addRoomModal'));
        modal.hide();
    }, 1500);
});