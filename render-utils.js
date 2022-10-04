export function renderBounty(bounty) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = bounty.image_url;
    // if (!bounty.image_url) {
    //     img.src = '../assets/wanted.png';
    // } else {
    //     img.src = bounty.image_url;
    // }

    const h2 = document.createElement('h2');
    h2.textContent = bounty.name;
    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(bounty.category);
    h2.prepend(span);

    const p = document.createElement('p');
    p.textContent = bounty.description;

    const div = document.createElement('div');
    div.textContent = bounty.contact;

    li.append(img, h2, p, div);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'green') return '🟢';
    if (category === 'yellow') return '🟡';
    if (category === 'orange') return '🟠';
    if (category === 'red') return '🔴';
    if (category === 'black') return '⚫️';
}
