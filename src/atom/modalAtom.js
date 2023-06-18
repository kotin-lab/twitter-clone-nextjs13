const { atom } = require("recoil");

export const commentModalState = atom({
  key: 'commentModalState',
  default: false
});

export const tweetModalState = atom({
  key: 'tweetModalState',
  default: false
});

export const postIdState = atom({
  key: 'postIdState',
  default: null
});