import { ApiProperty } from "@nestjs/swagger";
import { InputType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class Credentials {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  username!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;
  //email
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  email!: string;
}
export class SignUpCredentials extends Credentials {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  firstName!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  lastName!: string;
}

export class SignInCredentials extends Credentials {
  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  rememberMe?: boolean;
}