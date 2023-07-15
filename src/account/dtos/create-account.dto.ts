import { Role } from 'src/base/role';
import { AccountStatus } from '../entities/account.entity';

export class NewAccountDto {
  email: string;
  password: string;
  status?: AccountStatus;
  role: Role;

  name: string;
  contact: string;
  avatar?: string;
}
