export interface ForgotPasswordDto {
  username: string;
}

export interface ResetPasswordDto {
  password: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
