import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const API_KEY = 'AIzaSyC__08icxVZhDQHu8u6s_SagISLqNoXCVA';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    // add validation

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        console.log(res);
        history.replace('/');
        // assumption: always succeeds
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength={8}
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
