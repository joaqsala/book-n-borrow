document.querySelector('#new-listing-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
        const bookName = document.querySelector('#title').value.trim();
        const author = document.querySelector('#author').value.trim();
        const yearPublish = document.querySelector('#year').value.trim();
        const rentalPrice = parseFloat(document.querySelector('#price').value.trim());
        const isbn = document.querySelector('#isbn').value.trim();
        const subject = document.querySelector('#subject').value.trim();
        const course = document.querySelector('#course').value.trim();
        // const coverUrl = document.querySelector('#book-cover-url').value.trim();
        
        const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookName, author, yearPublish, rentalPrice, isbn, subject, course })
        });
    
        if (response.ok) {
        alert('Book added successfully!');
        location.reload();
        } else {
        alert('Failed to add book');
        }
    });