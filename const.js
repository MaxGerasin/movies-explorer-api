const LINK_REG_EXP = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

const codesError = {
  INCORRECT_DATA: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND_DATA: 404,
  CONFLICT: 409,
  DEFAULT: 500,
};

const errorMessages = {
  INCORRECT_DATA: 'Переданы некорректные данные',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND_DATA: 'Данные не найдены',
  WRONG_PATH: 'Введен неправильный адрес',
  CONFLICT: 'Пользователь с такими данными уже существуют',
  DEFAULT: 'На сервере произошла ошибка',
  INVALID_EMAIL: 'Введен некорректный адрес почты',
  INVALID_URL: 'Введена некорректная ссылка',
  UNAUTHORIZED_AUTH: 'Введена неправильная почта или пароль',
};

module.exports = { codesError, errorMessages, LINK_REG_EXP };
