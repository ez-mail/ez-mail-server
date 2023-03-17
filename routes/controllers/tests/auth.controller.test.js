const {
  findUserByEmail,
  createUser,
} = require('../../../services/user.service');
const { signUp } = require('../auth.controller');

jest.mock('../../../services/user.service');

describe('signUp', () => {
  const req = {
    body: {
      email: 'user@example.com',
      userName: 'user',
      password: 'user-password',
    },
  };
  const res = {
    sendStatus: jest.fn(),
  };
  const next = jest.fn();

  it('해당하는 email 이 이미 존재하면 해당 메시지를 담은 에러를 next 인자로 호출', async () => {
    findUserByEmail.mockReturnValue(
      Promise.resolve({ email: 'user@example.com' }),
    );

    await signUp(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new Error('가입된 이메일이 이미 존재합니다.'),
    );
    expect(next.mock.calls[0][0].status).toBe(400);
  });

  it('해당하는 이메일이 없으면 유저 생성 후 201 응답코드로 응답', async () => {
    findUserByEmail.mockReturnValue(Promise.resolve(null));
    createUser.mockReturnValue(Promise.resolve(true));

    await signUp(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(201);
  });

  it('db 문제로 유저 생성 중 에러나면 next 로 해당 에러객체 전달', async () => {
    findUserByEmail.mockReturnValue(Promise.resolve(null));
    createUser.mockImplementation(() => {
      const err = new Error();

      err.status = 500;

      throw err;
    });

    await signUp(req, res, next);

    expect(next.mock.calls[0][0].status).toBe(500);
  });
});

describe('login', () => {
  const req = {
    body: {
      email: 'user@example.com',
      password: 'user-password',
    },
  };
  const res = {
    sendStatus: jest.fn(),
  };
  const next = jest.fn();
});
