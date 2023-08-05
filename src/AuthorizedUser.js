import React from 'react';

const AuthorizedUser = () => {
  const requestCode = () => {
    const clientID = "";
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  return (
    <button onClick={requestCode}>
      Sign In with GitHub
    </button>
  );
}

export default AuthorizedUser;