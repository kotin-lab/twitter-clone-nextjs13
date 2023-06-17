const { atom } = require("recoil");

export const userState = atom({
  key: 'userState',
  default: null
});

export const statusState = atom({
  key: 'statusState',
  default: 'loading'
});