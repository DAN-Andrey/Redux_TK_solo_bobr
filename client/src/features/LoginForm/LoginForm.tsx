
import styles from "./LoginForm.module.css";
import UserValidate from "../../entities/user/api/UserValidate";
import './LoginForm.module.css'
import { useAppDispatch } from "../../shared/hoocs/useReduxHooks/useReduxHooks";
import type { UserSignInData } from "../../entities/user/model";
import { signInThunk } from "../../entities/user/api/UserApi";

function LoginForm() {
  const dispatch = useAppDispatch();
  const loginHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.target));
      const { isValid, error } = UserValidate.validateLoginData(formData as UserSignInData);
      if (!isValid) return alert(error);
      dispatch(signInThunk(formData as UserSignInData));
      alert("✅ Вход успешен!");
    } catch (error) {
      console.log(error);
      alert("❌ Логин или пароль неверны!");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={loginHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Электронная почта</div>
          <input className={styles.input} name="email" type="email" required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Пароль</div>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
