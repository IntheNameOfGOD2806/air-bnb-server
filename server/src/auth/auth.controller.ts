import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Credentials, SignUpCredentials } from "../auth/Credentials";
import { UserInfo } from "./UserInfo";
import { User } from "src/user/base/User";
import { Request } from "express";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(@Body() body: Credentials): Promise<UserInfo> {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: User,
  })
  @Get("me")
  async me(@Req() req: Request): Promise<User> {
    return this.authService.me(req.headers.authorization);
  }
  @Post("check-user")
  async checkUser(@Body() body: { email: string }): Promise<User> {
    return this.authService.checkUser(body.email);
  }
  @Post("signup")
  async register(@Body() body: SignUpCredentials): Promise<UserInfo> {
    return this.authService.register(body);
  }
  @Post("logout")
  async logout(): Promise<void> {
    return this.authService.logout();
  }
}
