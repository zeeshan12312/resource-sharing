const user = require('../controllers/usersController');

describe('User Accounts', () => {
  it('List', () => {
    const result = user.userslist();
    expect(result).toBeDefined();
  });
  it('Get User By Id', () => {
    ``;
    const result = user.updateUserById('62f38751d9c2a83b18d90e8d');
    expect(result).toMatchObject({});
  });
  it('Add User', () => {
    const args = [null, '', NaN, 0, false, undefined];
    args.forEach((a) => {
      expect(() => {
        user.addUser(a);
      }).toThrow();
    });
  });
});
