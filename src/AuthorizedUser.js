import React, {useState} from 'react';

function AuthorizedUser() {
  const [signingIn, setSigningIn] = useState(false); // eslint-disable-line

  const requestCode = () => {
    const clientID = "";
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  return (
    <button onClick={requestCode} disabled={signingIn}>
      Sign In with GitHub
    </button>
  );
}

export default AuthorizedUser;