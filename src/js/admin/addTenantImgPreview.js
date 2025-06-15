// Reset form and preview when modal is closed
document.getElementById('addtenantModal').addEventListener('hidden.bs.modal', function () {
    const form = document.getElementById('addRoomForm'); // your form
    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('formFeedback').classList.add('d-none');
    document.getElementById('formFeedback').classList.remove('alert-danger', 'alert-success');    

    // Hide preview
    const preview = document.getElementById('previewImage');  
    preview.classList.add('d-none');  
    preview.src = '';
  });

  // Image preview
  document.getElementById('roomImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById('previewImage');
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.classList.remove('d-none');  
      };
      reader.readAsDataURL(file);
    } else {
      preview.classList.add('d-none');  
      preview.src = '';
    }
  });

  // Handle form submission
  document.getElementById('addRoomForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = this;
    const feedback = document.getElementById('formFeedback');
    const roomNumber = document.getElementById('roomNumber').value.trim();
    const tenantName = document.getElementById('tenantName').value.trim();
    const tenantDate = document.getElementById('tenantDate').value.trim();
    const rentAmount = document.getElementById('rentAmount').value.trim();
    const payAmount = document.getElementById('pay_Amount').value.trim();

    const roomImage = document.getElementById('roomImage').files[0];

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      feedback.classList.remove('d-none');
      feedback.classList.add('alert-danger');  
      feedback.textContent = 'Please fill out all required fields';
      return;
    }

    // Handle form submission (Save or Ajax) here
    const tenantData = {
      roomNumber,
      tenantName,
      tenantDate,
      rentAmount,
      payAmount,
      roomImage: roomImage ? roomImage.name : null,
    };
    console.log('New Tenant!', tenantData);

    // Provide a success message
    feedback.classList.remove('d-none', 'alert-danger');  
    feedback.classList.add('alert-success');  
    feedback.textContent = 'Tenant added successfully!';

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('addtenantModal'));
      modal.hide();
    }, 1500);
  });