document.addEventListener('DOMContentLoaded', function() {
    const checkoutButtons = document.querySelectorAll('.checkout-button');

    checkoutButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const bookId = event.target.dataset.bookId;
            
            fetch(`/api/books/checkedOut/${bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Include session cookies in the request
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("Book checked out successfully!");
                    document.location.replace('/');
                    // Here you could also redirect to a different page or update the page view
                    // For example:
                    // window.location.href = '/some-other-page';
                } else {
                    alert("An error occurred while checking out the book.");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    });
});
