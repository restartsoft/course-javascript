const lp = {
  getRandomElement(array) {
    const maxRandomIndex = array.length;
    const randomIndex = parseInt(Math.random() * maxRandomIndex);

    return array[randomIndex];
  },
  getNextPhoto() {
    const friendsDB = require('./friends.json');
    const photosDB = require('./photos.json');

    const maxFriendsIndex = friendsDB.length;
    const friendsIndex = parseInt(Math.random() * maxFriendsIndex);

    const photos = photosDB[friendsDB[friendsIndex].id];

    const maxPhotosIndex = photos.length;
    const photosIndex = parseInt(Math.random() * maxPhotosIndex);

    return {
      friend: {
        firstName: friendsDB[friendsIndex].firstName,
      },
      url: photos[photosIndex].url,
    };
  },
};

let photo = lp.getNextPhoto();

console.log(photo.friend); // { firstName: 'Иван' }
console.log(photo.url); // https://...

photo = lp.getNextPhoto();

console.log(photo.friend); // { firstName: 'Сергей' }
console.log(photo.url);
