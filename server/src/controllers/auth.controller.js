const { User } = require("../../db/models"); // забираем метод валидации
const bcrypt = require("bcrypt"); // для шифрования пароля
const AuthService = require("../services/auth.service");
const generateTokens = require("../utils/generateTokens"); // для создания пары токенов
const cookieConfig = require("../configs/cookieConfig"); // для настроек cookie
const formatResponse = require("../utils/formatResponse");

class AuthController {
  // регистрация - создание записи в БД
  static async signUp(req, res) {
    const { email, password, name, role } = req.body;
    const { isValid, err } = User.validateSignUpData({
      email,
      password,
      name,
      role,
    });
    if (!isValid) return res.status(400).json(formatResponse(400, err));
    // зашифровали пароль из req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { user, created } = await AuthService.signUp({
        name,
        email,
        password: hashedPassword,
        role,
      });
      // если пользователя нашли, а не создали
      if (!created)
        return res.status(400).json(formatResponse(400, "User already exists"));

      // убераем метаданные
      const plainUser = user.get();
      // удаляем пароль
      delete plainUser.password;

      // вызываю функцию generateTokens и передаю { user: plainUser }
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return (
        res
          .status(201)
          // добавляю cookie с названием refreshToken
          .cookie("refreshToken", refreshToken, cookieConfig.refresh)
          .json(
            formatResponse(201, "Registration successful", {
              user: plainUser,
              accessToken,
            }),
          )
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const { isValid, err } = User.validateLoginData({ email, password });
    if (!isValid) return res.status(400).json(formatResponse(400, err));
    try {
      const user = await AuthService.getUserByEmail({ email });
      if (!user)
        return res.status(400).json(formatResponse(400, "User not found"));

      // проверить пароли с формочки (req.body) - password и из БД  - user.password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res
          .status(400)
          .json(formatResponse(400, "Invalid email or password"));

      const plainUser = user.get();
      delete plainUser.password;

      // plainUser - простой юзер без пароля
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });
      return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse(201, "Login successful", {
            user: plainUser,
            accessToken,
          }),
        );
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async logout(req, res) {
    return res
      .clearCookie("refreshToken", cookieConfig.refresh)
      .json(formatResponse(200, "Logout success"));
  }

  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals; // потому что используем мидлвару verifyRefreshToken

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieConfig.refresh)
        .json(
          formatResponse(200, "Success", {
            user,
            accessToken,
          }),
        );
    } catch (error) {
      console.log(error);
      res.status(500).json(formatResponse(500, "Server Error"));
    }
  }
}
module.exports = AuthController;
