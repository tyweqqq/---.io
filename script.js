const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const cards = [...document.querySelectorAll('.destination-card')];
const filterButtons = [...document.querySelectorAll('.filter')];
const destinationInput = document.querySelector('#destination-input');
const seasonInput = document.querySelector('#season-input');
const typeInput = document.querySelector('#type-input');
const emptyState = document.querySelector('#empty-state');
let activeFilter = 'all';

function filterDestinations() {
  const query = destinationInput.value.trim().toLocaleLowerCase('ru');
  const season = seasonInput.value;
  const type = typeInput.value;
  let visibleCount = 0;
  cards.forEach(card => {
    const matchesQuery = !query || `${card.dataset.name} ${card.dataset.location}`.toLocaleLowerCase('ru').includes(query);
    const matchesSeason = season === 'all' || card.dataset.season === season;
    const matchesType = (type === 'all' || card.dataset.type === type) && (activeFilter === 'all' || card.dataset.type === activeFilter);
    const show = matchesQuery && matchesSeason && matchesType;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  filterDestinations();
}));
document.querySelector('#trip-search').addEventListener('submit', event => {
  event.preventDefault();
  filterDestinations();
  document.querySelector('#destinations').scrollIntoView({ behavior: 'smooth' });
});
[ destinationInput, seasonInput, typeInput ].forEach(input => input.addEventListener('input', filterDestinations));

document.querySelectorAll('.save-btn').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(saved));
  button.classList.toggle('saved', saved);
  button.textContent = saved ? '♥' : '♡';
}));

document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email-input');
  const message = document.querySelector('#newsletter-message');
  if (!email.checkValidity()) { email.reportValidity(); return; }
  message.textContent = 'Спасибо! Форма работает в демо-режиме — подключи сервис рассылки, чтобы сохранять подписки.';
  email.value = '';
});
document.querySelector('#year').textContent = new Date().getFullYear();
