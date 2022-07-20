import { Injectable } from "@nestjs/common";
import { User as UserEntity } from "src/users/entities/user.entity";
import { InferSubjects, Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
export type Subjects = InferSubjects<typeof UserEntity> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
    defineAbility(user: UserEntity) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>,);
        if (user.is_admin) {
            can(Action.Manage, 'all');
        } else {
            can(Action.Read, UserEntity);
            cannot(Action.Create, UserEntity).because('you\'re Not allowed for this Action');
            cannot(Action.Delete, UserEntity).because('you\'re Not allowed to delete');
            cannot(Action.Manage, UserEntity).because('you\'re Not allowed for this Admins Role');
            cannot(Action.Update, UserEntity).because('you\'re Not allowed to update this field');


        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}