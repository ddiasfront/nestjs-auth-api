
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    user = "user",
    admin = "admin"
}

export class CreateUserInput {
    email: string;
    name: string;
    password: string;
    role: Role;
}

export class UpdateUserInput {
    id?: Nullable<string>;
}

export class User {
    id?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    email?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Role>;
    password?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
