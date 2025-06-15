const searchInput = document.getElementById('roomSearch');
const sortSelect = document.getElementById('sortStatus');
const roomContainer = document.getElementById('roomContainer');
const paginationContainer = document.getElementById('pagination');
const roomCards = Array.from(document.querySelectorAll('.room-card'));
const cardsPerPage = 10;

let currentPage = 1;
let filteredCards = [...roomCards]; 

function renderCards() {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToShow = filteredCards.slice(startIndex, endIndex);

  roomContainer.innerHTML = '';

  cardsToShow.forEach(card => roomContainer.appendChild(card));

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  paginationContainer.innerHTML = '';

  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `
    <a class="page-link pagination-link pagination-prev" href="#" aria-label="Previous">
      <i class="bi bi-chevron-left"></i>
    </a>
  `;
  paginationContainer.appendChild(prevLi);

  for (let i = 1; i <= totalPages; i++) {
    const pageLi = document.createElement('li');
    pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
    pageLi.innerHTML = `<a class="page-link pagination-link" href="#">${i}</a>`;
    paginationContainer.appendChild(pageLi);
  }

  const nextLi = document.createElement('li');
  nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  nextLi.innerHTML = `
    <a class="page-link pagination-link pagination-next" href="#" aria-label="Next">
      <i class="bi bi-chevron-right"></i>
    </a>
  `;
  paginationContainer.appendChild(nextLi);

  document.querySelectorAll('.pagination-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const isPrev = link.classList.contains('pagination-prev');
      const isNext = link.classList.contains('pagination-next');
      const pageNum = parseInt(link.textContent);

      if (isPrev && currentPage > 1) {
        currentPage--;
      } else if (isNext && currentPage < totalPages) {
        currentPage++;
      } else if (!isNaN(pageNum)) {
        currentPage = pageNum;
      }

      renderCards();
    });
  });
}

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  filteredCards = roomCards.filter(card => {
    const roomName = card.getAttribute('data-room').toLowerCase();
    return roomName.includes(searchTerm);
  });

  currentPage = 1; 
  renderCards();
});

sortSelect.addEventListener('change', function() {
  const sortValue = this.value;
  filteredCards = [...filteredCards]; 

  if (sortValue === 'vacant') {
    filteredCards.sort((a, b) => {
      const statusA = a.getAttribute('data-status');
      const statusB = b.getAttribute('data-status');
      return statusA === 'Vacant' ? -1 : statusB === 'Vacant' ? 1 : 0;
    });
  } else if (sortValue === 'occupied') {
    filteredCards.sort((a, b) => {
      const statusA = a.getAttribute('data-status');
      const statusB = b.getAttribute('data-status');
      return statusA === 'Occupied' ? -1 : statusB === 'Occupied' ? 1 : 0;
    });
  } else {
    filteredCards.sort((a, b) => {
      const roomA = a.getAttribute('data-room');
      const roomB = b.getAttribute('data-room');
      return roomA.localeCompare(roomB);
    });
  }

  currentPage = 1; 
  renderCards();
});

renderCards();