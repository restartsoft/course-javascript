import model from './model';

let startX = 0;

export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);
  },

  setFriendAndPhoto(friend, id, url) {
    const componentPhoto = document.querySelector('.component-photo');
    const componentProfileLink = document.querySelector('.component-header-profile-link');
    const componentHeaderPhoto = document.querySelector('.component-header-photo');
    const componentHeaderName = document.querySelector('.component-header-name');

    componentPhoto.style.backgroundImage = `url(${url})`;

    componentProfileLink.href = friend.link;

    componentHeaderPhoto.style.backgroundImage = `url(${friend.avatar})`;
    componentHeaderPhoto.style.backgroundSize = 'cover';
    componentHeaderPhoto.style.backgroundPosition = 'center';

    componentHeaderName.textContent = `${friend.firstName} ${friend.lastName}`;
  },

  handleEvents() {
    document.addEventListener('touchstart', (e) => {
      startX = Math.trunc(e.changedTouches[0].clientX);
    });

    document.addEventListener('touchend', async (e) => {
      const endX = Math.trunc(e.changedTouches[0].clientX);
      const docWidth = document.body.clientWidth;
      const touchWidth = Math.abs(endX - startX);

      // Листаем при протяжке от 10% от ширина документа
      if (touchWidth / docWidth >= 0.1) {
        await this.getNextPhoto();
      }
    });
  },
};
