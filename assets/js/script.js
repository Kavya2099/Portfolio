'use strict';

// element toggle function
const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle('active'); };


// SIDEBAR
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebarBtn && sidebar) sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));


// TESTIMONIALS MODAL
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
};

if (testimonialsItem && testimonialsItem.length && modalContainer && modalImg && modalTitle && modalText) {
  testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title = this.querySelector('[data-testimonials-title]');
      const text = this.querySelector('[data-testimonials-text]');
      if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt; }
      if (title) modalTitle.innerHTML = title.innerHTML;
      if (text) modalText.innerHTML = text.innerHTML;
      testimonialsModalFunc();
    });
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
if (overlay) overlay.addEventListener('click', testimonialsModalFunc);


// CUSTOM SELECT & FILTER
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (select) select.addEventListener('click', function () { elementToggleFunc(this); });

const filterFunc = function (selectedValue) {
  if (!filterItems) return;
  filterItems.forEach(item => {
    if (selectedValue === 'all' || selectedValue === item.dataset.category) item.classList.add('active');
    else item.classList.remove('active');
  });
};

if (selectItems && selectItems.length) {
  selectItems.forEach(si => si.addEventListener('click', function () {
    const val = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(val);
  }));
}

if (filterBtn && filterBtn.length) {
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => btn.addEventListener('click', function () {
    const val = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(val);
    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  }));
}


// CONTACT FORM
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
if (form && formInputs && formBtn) {
  formInputs.forEach(input => input.addEventListener('input', function () {
    if (form.checkValidity()) formBtn.removeAttribute('disabled');
    else formBtn.setAttribute('disabled', '');
  }));
}


// PAGE NAVIGATION
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks && navigationLinks.length) {
  navigationLinks.forEach(link => link.addEventListener('click', function (e) {
    e.preventDefault();
    const selected = this.textContent.trim().toLowerCase();
    // remove active
    navigationLinks.forEach(n => n.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    // activate matching page
    let matched = false;
    pages.forEach(p => {
      if (p.dataset.page === selected) {
        p.classList.add('active'); matched = true;
      }
    });
    // mark clicked link active regardless
    this.classList.add('active');
    if (matched) window.scrollTo(0, 0);
  }));
}