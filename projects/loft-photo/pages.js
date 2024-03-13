const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const activeElement = document.querySelector('[active]');
    //const element = document.querySelector(`.page-${name}`);
    const element = document.querySelector(pagesMap[name]);

    if (activeElement !== null && activeElement !== element) {
      activeElement.classList.toggle('hidden');
      activeElement.toggleAttribute('active');
    } else if (activeElement === element) return;

    element.classList.toggle('hidden');
    element.toggleAttribute('active');
  },
};
