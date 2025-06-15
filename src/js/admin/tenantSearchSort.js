document.addEventListener('DOMContentLoaded', function() {

  const searchInput = document.getElementById('roomSearch');
  const filterSelect = document.getElementById('statusFilter');
  const roomContainer = document.querySelector('.row.row-cols-1.row-cols-md-2.row-cols-lg-4.g-4');
  const paginationContainer = document.getElementById('pagination');
  const roomCards = Array.from(roomContainer.children);
  let currentPage = 1;
  const cardsPerPage = 12;

  function filterSortAndPaginate() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filterStatus = filterSelect.value;

      let visibleCards = roomCards.filter(card => {
          const roomName = card.querySelector('.card-title').innerHTML.toLowerCase();
          const tenantName = card.querySelector('.text-muted').innerHTML.toLowerCase();
          const badge = card.querySelector('.badge').innerHTML.trim();

          if (searchTerm && !roomName.includes(searchTerm) && !tenantName.includes(searchTerm)) {
              return false;
          }

          if (filterStatus !== 'all' && !badge.toLowerCase().includes(filterStatus.toLowerCase())) {
              return false;
          }

          return true;
      });

      visibleCards.sort((a, b) => {
          const roomA = extractRoomNumber(a.querySelector('.card-title').innerHTML);
          const roomB = extractRoomNumber(b.querySelector('.card-title').innerHTML);
          return roomA - roomB;
      });

      const totalPages = Math.ceil(visibleCards.length / cardsPerPage);

      if (currentPage > totalPages) {
          currentPage = totalPages || 1;
      }

      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const paginatedCards = visibleCards.slice(startIndex, endIndex);

      roomContainer.innerHTML = '';
      paginatedCards.forEach(card => roomContainer.appendChild(card));


      updatePagination(totalPages);
  }

  function extractRoomNumber(text) {
      return parseInt(text.replace(/[^\d]/g, ''), 10);
  }

  function updatePagination(totalPages) {
      paginationContainer.innerHTML = '';

      const prevItem = document.createElement('li');
      prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
      prevItem.innerHTML = '<a class="page-link transition-all shadow-sm" href="#" aria-label="Previous"><i class="bi bi-chevron-left"></i></a>';
      prevItem.addEventListener('click', (e) => {
          e.preventDefault();
          if (currentPage > 1) {
              currentPage--;
              filterSortAndPaginate();
          }
      });
      paginationContainer.appendChild(prevItem);

      for (let i = 1; i <= totalPages; i++) {
          const pageItem = document.createElement('li');
          pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
          pageItem.innerHTML = `<a class="page-link transition-all shadow-sm ${i === currentPage ? 'bg-primary text-white border-primary' : ''}" href="#">${i}</a>`;
          pageItem.addEventListener('click', (e) => {
              e.preventDefault();
              currentPage = i;
              filterSortAndPaginate();
          });
          paginationContainer.appendChild(pageItem);
      }

      const nextItem = document.createElement('li');
      nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
      nextItem.innerHTML = '<a class="page-link transition-all shadow-sm" href="#" aria-label="Next"><i class="bi bi-chevron-right"></i></a>';
      nextItem.addEventListener('click', (e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
              currentPage++;
              filterSortAndPaginate();
          }
      });
      paginationContainer.appendChild(nextItem);
  }

  searchInput.addEventListener('input', filterSortAndPaginate);
  filterSelect.addEventListener('change', filterSortAndPaginate);

  filterSortAndPaginate();
});