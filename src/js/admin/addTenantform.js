document.getElementById('addtenantModal').addEventListener('hidden.bs.modal', function () {
    const form = document.getElementById('addTenantForm');
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('formFeedback').classList.add('d-none');
    document.getElementById('formFeedback').classList.remove('alert-danger', 'alert-success');
    document.getElementById('previewImage').classList.add('d-none');
    document.getElementById('previewImage').src = '';
});

// Image preview
document.getElementById('tenantImage').addEventListener('change', function (event) {
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

// Form submission
document.getElementById('addTenantForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const form = this;
    const feedback = document.getElementById('formFeedback');
    const tenantName = document.getElementById('tenantName').value.trim();
    const tenantDescription = document.getElementById('tenantDescription').value.trim();
    const tenantImage = document.getElementById('tenantImage').files[0 ];

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        feedback.classList.remove('d-none');
        feedback.classList.add('alert-danger');
        feedback.textContent = 'Please fill out all required fields';
        return;
    }

    const tenantData = {
        tenantName,
        tenantDescription,
        tenantImage: tenantImage ? tenantImage.name : null
    };
    console.log('New Tenant!', tenantData);

    feedback.classList.remove('d-none', 'alert-danger');
    feedback.classList.add('alert-success');
    feedback.textContent = 'Tenant added successfully!';

    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('addtenantModal'));
        modal.hide();
    }, 1500);
});
