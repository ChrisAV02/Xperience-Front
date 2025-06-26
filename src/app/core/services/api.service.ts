import { Injectable } from '@angular/core';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://tu-api.com';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
    });

    // Interceptor para añadir el token a las peticiones
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async login(authRequest: LoginRequest): Promise<AuthResponse> {
    const response = await this.axiosInstance.post(
      `${this.apiUrl}/login`,
      authRequest
    );
    return response.data;
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.axiosInstance.post(
      `${this.apiUrl}/register`,
      registerData
    );
    return response.data;
  }
}
