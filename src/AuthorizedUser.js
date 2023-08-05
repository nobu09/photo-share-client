import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthorizedUser = () => {
  const [signingIn, setSigningIn] = useState(false);
//   const history = useHistory();

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace("?code=", "");
      alert(code);
    }
  });

  const requestCode = () => {
    const clientID = process.env.GITHUB_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  return (
    <button onClick={requestCode} disabled={signingIn}>
      Sign In with GitHub
    </button>
  );
}

export default AuthorizedUser;