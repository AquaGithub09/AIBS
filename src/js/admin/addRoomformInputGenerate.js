function addInputField() {
    const inputContainer = document.getElementById('inputContainer');
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group mb-2';
    inputGroup.innerHTML = `
      <input type="text" class="form-control" name="Features[]">
      <button type="button" class="btn btn-danger delete-btn">Delete</button>
    `;
    inputContainer.appendChild(inputGroup);
    inputGroup.querySelector('.delete-btn').addEventListener('click', function() {
      inputGroup.remove();
    });
  }

  document.getElementById('addInput').addEventListener('click', addInputField);

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.target.closest('.input-group').remove();
    }
  });