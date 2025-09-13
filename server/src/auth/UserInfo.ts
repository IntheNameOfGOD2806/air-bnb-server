import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../user/base/User";

@ObjectType()
export class UserInfo implements Partial<User> {
  //email
  @Field(() => String)
  email!: string | null;
  //userImage
  @Field(() => String)
  userImage!: string | null ;
  //id
  @Field(() => String)
  id!: string;
  //username
  @Field(() => String)
  username!: string;
  //first name
  @Field(() => String)
  firstName!: string | null;
  //last name
  @Field(() => String)
  lastName!: string | null;
  //roles
  @Field(() => [String])
  roles!: string[];
  @Field(() => String)
  accessToken?: string;
}
