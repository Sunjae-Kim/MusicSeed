export const getEmail = (checkedEmail = '', action) => {
  switch (action.type) {
    case 'CHECKED_EMAIL':
      return action.payload;
    default:
      return checkedEmail;
  }
};

export const getPassword = (checkedPassword = '', action) => {
  switch (action.type) {
    case 'CHECKED_PASSWORD':
      return action.payload;
    default:
      return checkedPassword;
  }
};

export const getConfirmedPassword = (confirmedPassword = '', action) => {
  switch (action.type) {
    case 'CONFIRMED_PASSWORD':
      return action.payload;
    default:
      return confirmedPassword;
  }
};

export const getUserName = (checkedName = '', action) => {
  switch (action.type) {
    case 'CHECKED_NAME':
      return action.payload;
    default:
      return checkedName;
  }
};

export const getUserNickname = (checkedNickname = '', action) => {
  switch (action.type) {
    case 'CHECKED_NICKNAME':
      return action.payload;
    default:
      return checkedNickname;
  }
};