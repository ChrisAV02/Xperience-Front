// EJEMPLO DE RESPONSE
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  nombres: string;
  apellidos: string;
}
