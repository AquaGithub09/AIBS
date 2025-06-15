function addEditInputField() {
    const inputContainer = document.getElementById('editInputContainer');
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group mb-2';
    inputGroup.innerHTML = `
      <input type="text" class="form-control" name="editFeatures[]">
      <button type="button" class="btn btn-danger delete-edit">Delete</button>
    `;
    inputContainer.appendChild(inputGroup);
    inputGroup.querySelector('.delete-edit').addEventListener('click', function() {
      inputGroup.remove();
    });
  }

  document.getElementById('addEditInput').addEventListener('click', addEditInputField);

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-edit')) {
      event.target.closest('.input-group').remove();
    }
  });