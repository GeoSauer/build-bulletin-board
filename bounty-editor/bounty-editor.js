/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createBounty } from '../fetch-utils.js';
/* Get DOM Elements */
const bountyForm = document.getElementById('bounty-form');
const errorDisplay = document.getElementById('error-display');
const addButton = bountyForm.querySelector('button');

/* State */
let error = null;

/* Events */
bountyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(bountyForm);

    const bounty = {
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        contact: formData.get('contact'),
    };

    const response = await createBounty(bounty);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});
/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
