
class Query {
  private fields;

  constructor(fields = {}) {
    this.fields = fields;
  }

  public getAllUsersQuery = (): string => 'SELECT * FROM USERS';

  public signUpQuery = (): string => {
    const { display_name, password, email, avatar, signup_date } = this.fields;

    return (
      `
        INSERT INTO USERS
        (display_name, password, email, avatar, signup_date)
        VALUES ('${display_name}', '${password}', '${email}', '${avatar}', '${signup_date}')
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
  
  public getUserByEmailOrDisplayName = (): string => {
    const { email, display_name } = this.fields;

    return (
      `
        SELECT * FROM USERS
        WHERE email = '${email}' or display_name = '${display_name}'
      `
    );
  }
}

export default Query;
