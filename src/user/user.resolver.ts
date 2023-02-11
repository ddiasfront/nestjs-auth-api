import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('loginUser')
  loginUser(
    @Args('name') name?: string,
    @Args('email') email?: string,
    @Args('password') password?: string,
  ) {
    return this.userService.loginUser(name, email, password);
  }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    console.log(id, 'ID');
    return this.userService.findOne(id);
  }

  @Query('userByNameAndEmail')
  findByNameEmail(@Args('name') name: string, @Args('email') email: string) {
    console.log(name, 'ID');
    console.log(email, 'ID');
    return this.userService.findByNameEmail(name, email);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
