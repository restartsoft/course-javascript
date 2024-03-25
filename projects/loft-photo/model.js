const VK = window.VK;

VK.init({
  apiId: 51885757,
});

const VKWrapper = {
  friends: [],

  callAPI(method, params) {
    params.v = '5.199';

    return new Promise((resolve, reject) => {
      VK.Api.call(method, params, (data) => {
        if (data.response) {
          resolve(data.response);
        } else {
          reject(new Error('Call error'));
        }
      });
    });
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.Auth.login((data) => {
        if (data.session) {
          resolve(data);
        } else {
          reject(new Error('Not connected'));
        }
      }, 4);
    });
  },

  async init() {
    const response = await this.callAPI('friends.get', { fields: 'photo_100,domain' });
    this.friends = response.items;
    return this.friends;
  },

  photoCache: {},

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    const response = await this.callAPI('photos.getAll', { owner_id: id });
    photos = response.items;

    this.photoCache[id] = photos;

    return photos;
  },
};

export default {
  getRandomElement(array) {
    const maxRandomIndex = array.length;
    const randomIndex = parseInt(Math.random() * maxRandomIndex);

    return array[randomIndex];
  },
  async getNextPhoto() {
    const maxFriendsIndex = VKWrapper.friends.length;
    const friendsIndex = parseInt(Math.random() * maxFriendsIndex);

    const photos = await VKWrapper.getFriendPhotos(VKWrapper.friends[friendsIndex].id);

    const maxPhotosIndex = photos.length;
    const photosIndex = parseInt(Math.random() * maxPhotosIndex);

    return {
      friend: {
        firstName: VKWrapper.friends[friendsIndex].first_name,
        lastName: VKWrapper.friends[friendsIndex].last_name,
        avatar: VKWrapper.friends[friendsIndex].photo_100,
        link: `https://vk.com/${VKWrapper.friends[friendsIndex].domain}`,
      },
      id: photos[photosIndex].id,
      url: photos[photosIndex].sizes.filter((photo) => photo.width > 360)[0].url,
    };
  },
  VKWrapper,
};
