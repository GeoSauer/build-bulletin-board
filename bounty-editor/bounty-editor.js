/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createBounty, uploadImage } from '../fetch-utils.js';
/* Get DOM Elements */
const bountyForm = document.getElementById('bounty-form');
const errorDisplay = document.getElementById('error-display');
const addButton = bountyForm.querySelector('button');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

/* State */
let error = null;

/* Events */
bountyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(bountyForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `bounties/${randomFolder}/${imageFile.name}`;
    let url = null;

    if (!imageFile.name) {
        url = null;
    } else {
        url = await uploadImage('images', imagePath, imageFile);
    }

    const bounty = {
        name: formData.get('name'),
        category: formData.get('category'),
        description: formData.get('description'),
        image_url: url,
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

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/wanted.png';
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
