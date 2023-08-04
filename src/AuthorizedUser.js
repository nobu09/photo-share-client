import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

const AuthorizedUser = () => {
  const [signingIn, setSigningIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      // コードを取得する
      const code = window.location.search.replace("?code=", "");
      alert(code);
      // ユーザーをリダイレクトする
      history.replace('/');
    }
  }, []);

  const requestCode = () => {
    const clientID = process.env.GITHUB_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };

  return (
    <button onClick={requestCode} disabled={signingIn}>
      Sign In with GitHub
    </button>
  )
}

export default withRouter(AuthorizedUser);