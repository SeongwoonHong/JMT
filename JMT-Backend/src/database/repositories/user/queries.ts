
class Query {
  private fields;

  constructor(fields = {}) {
    this.fields = fields;
  }

  public getAllUsersQuery = (): string => 'SELECT * FROM USERS';

  public signUpQuery = (): string => {
    const { display_name, password, email } = this.fields;

    return (
      `
        INSERT INTO USERS
        (display_name, password, email)
        VALUES ('${display_name}', '${password}', '${email}')
      `
    );
  }

  public removeByIdQuery = (): string => {
    const { user_id } = this.fields;

    return (
      `
        DELETE FROM USERS
        WHERE user_id = '${user_id}'
      `
    );
  };

  public removeByEmailQuery = (): string => {
    const { email } = this.fields;

    return (
      `
        DELETE FROM USERS
        WHERE email = '${email}'
      `
    );
  };
  
  public getUserByEmail = (): string => {
    const { email } = this.fields;

    return (
      `
        SELECT * FROM USERS
        WHERE email = '${email}'
      `
    );
  }
}

export default Query;
