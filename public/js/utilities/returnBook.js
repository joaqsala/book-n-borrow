document.querySelectorAll('.return-book-btn').forEach((button) => {
  button.addEventListener('click', async (event) => {
    const rentalId = event.currentTarget.dataset.rentalId;

    console.log(`Rental ID: ${rentalId}`);  // Debugging line

    const url = `/api/book/return/${rentalId}`;
    console.log(`Fetch URL: ${url}`);  // Debugging line

    const response = await fetch(url, {
      method: 'PUT',
    });
  
    if (response.ok) {
      alert('Book returned successfully');
      location.reload();
    } else {
      alert('Failed to return book');
    }
  });
});