/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { getBounties } from './fetch-utils.js';
import { renderBounty } from './render-utils.js';

/* Get DOM Elements */
const bountyList = document.getElementById('bounty-list');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;
let bounties = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getBounties();

    error = response.error;
    bounties = response.data;

    if (error) {
        displayError();
    }

    if (bounties) {
        displayBounties();
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

function displayBounties() {
    bountyList.innerHTML = '';

    for (const bounty of bounties) {
        const bountyEl = renderBounty(bounty);
        bountyList.append(bountyEl);
    }
}
