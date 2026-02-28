import styles from "./SignUpForm.module.css";
import UserValidate from "../../entities/user/api/UserValidate";
import "./SignUpForm.module.css";
import { useAppDispatch } from "../../shared/hoocs/useReduxHooks/useReduxHooks";
import type { UserSignUpData } from "../../entities/user/model";
import { signUpThunk } from "../../entities/user/api/UserApi";

function SignUpForm() {
  const dispatch = useAppDispatch();

  const signUpHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(
        new FormData(event.target),
      );
      const { isValid, error } = UserValidate.validateSignUpData(
        formData as UserSignUpData,
      );
      if (!isValid) return alert(error);
      await dispatch(signUpThunk(formData as UserSignUpData));
    } catch (error) {
      console.log("Ошибка регистрации:", error);
      alert(error || "Ошибка при регистрации");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={signUpHandler}>
        <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Имя</div>
          <input className={styles.input} name="name" type="text" required />
        </div>
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
        {/* <div className={styles.inputGroup}>
          <div className={styles.inputLabel}>Повторите пароль</div>
          <input
            className={styles.input}
            name="confirmPassword"
            type="password"
            required
          />
        </div> */}
        <button type="submit" className={styles.submitButton}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
