export class UpdateAccountDto {
  id: string;

  profile: {
    name: string;
    contact: string;
    avatar?: string;
  };
}
