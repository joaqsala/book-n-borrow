const deleteButtons = document.querySelectorAll('.delete-book-button');

deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const bookId = event.target.dataset.bookId;

        const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        });

        if (response.ok) {
        // If successful, reload the page
        document.location.reload();
        } else {
        alert('Failed to delete book');
        }
    });
});