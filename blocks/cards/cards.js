import { createOptimizedPicture,fetchPlaceholders } from '../../scripts/aem.js';


const placeholders = await fetchPlaceholders('en');

export default function decorate(block) {
  /* change to ul, li */

  const defaultPlaceholder = ''
  const {fooBar} = placeholders
console.log('fooBar in Crd',fooBar)
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const link = div.querySelector('a');
      if (link) {
        link.textContent = fooBar || defaultPlaceholder;
      }
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

