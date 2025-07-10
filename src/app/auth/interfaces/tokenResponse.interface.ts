export interface VerifyTokenResponse {
  status:   number;
  errorMsg: string;
  result: {
    userLogin: {
      rol:     number;
      name:    string;
      id_user: number;
    };
  };
}
