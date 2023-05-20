const signupFormHandler = async (event) => {
    event.preventDefault();
    const firstName = document.querySelector('#first-name').value.trim();
    const lastName = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    if (firstName && lastName && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // If successful, redirect the browser to the home page
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

    document
    .querySelector('.signup-form')
    .addEventListener('signup-submit', signupFormHandler);