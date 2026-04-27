import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepositories';
import { SearchParams } from '../infra/database/repositories/UsersRepository';
import { IPaginateUser } from '../domain/models/IPaginateUser';
import { User } from '../infra/database/entities/User';
@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const users = this.usersRepository.findAll({ page, skip, take });
    return users;
  }
}

export default ListUserService;
