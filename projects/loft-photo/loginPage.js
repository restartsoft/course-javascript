import model from './model';
import pages from './pages';
import mainPage from './mainPage';

export default {
  handleEvents() {
    document.querySelector('.page-login-button').addEventListener('click', async () => {
      await model.VKWrapper.login();
      await model.VKWrapper.init();
      pages.openPage('main');
      await mainPage.getNextPhoto();
    });
  },
};
