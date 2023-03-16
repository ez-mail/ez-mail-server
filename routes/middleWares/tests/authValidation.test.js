const { validateLogin, validateLogout } = require('../authValidation');

describe('validateLogin', () => {
  const next = jest.fn();

  it('로그인 상태면 validateLogin 이 next 호출', () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    validateLogin(req, null, next);

    expect(next).toBeCalledTimes(1);
  });

  it('로그인 상태가 아니면 validateLogin이 에러를 담아 next 호출', () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    validateLogin(req, null, next);

    expect(next).toHaveBeenCalledWith(new Error('먼저 로그인을 해주세요.'));
    expect(next.mock.calls[0][0].status).toBe(401);
  });
});

describe('validateLogout', () => {
  const next = jest.fn();

  it('로그아웃 상태면 validateLogout 이 next 호출', () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    validateLogout(req, null, next);

    expect(next).toBeCalledTimes(1);
  });

  it('로그아웃 상태가 아니면 validateLogout 이 에러를 담아 next 호출', () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    validateLogout(req, null, next);

    expect(next).toHaveBeenCalledWith(new Error('먼저 로그아웃을 해주세요.'));
    expect(next.mock.calls[0][0].status).toBe(403);
  });
});
