import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Credentials, SignUpCredentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo } from "./UserInfo";
import { UserService } from "../user/user.service";
import { User } from "src/user/base/User";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.user({
      where: { email },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles, username, email, firstName, lastName, userImage } =
        user;
      const roleList = roles as string[];
      return {
        id,
        username,
        roles: roleList,
        email,
        firstName,
        lastName,
        userImage,
      };
    }
    return null;
  }
  async validateUserReg(
    username: string,
    email: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.findFirstUser({
      where: {
        OR: [{ username }, { email }],
      },
    });
    console.log(1231331);
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id, roles, email, firstName, lastName, userImage } = user;
      const roleList = roles as string[];
      return {
        id,
        username: user.username, // important: take from `user`, not input
        roles: roleList,
        email,
        firstName,
        lastName,
        userImage,
      };
    }

    return null;
  }

  async login(credentials: Credentials): Promise<UserInfo | any> {
    try {
      const { email, password } = credentials;
      const user = await this.validateUser(email, password);
      if (!user) {
        return {
          message: "Thông tin đăng nhập sai",
          statusCode: 401,
        };
      }
      const accessToken = await this.tokenService.createToken({
        id: user!.id,
        email,
        password,
      });
      return {
        accessToken,
        ...user,
      };
    } catch (error: any) {
      throw new UnauthorizedException(error?.message);
    }
  }
  async checkUser(email: string): Promise<any> {
    const userStatus = await this.userService.user({
      where: { email },
      select: {
        username: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!userStatus) {
      throw new NotFoundException(`No resource was found for ${email}`);
    }
    return userStatus;
  }
  async register(credentials: SignUpCredentials): Promise<UserInfo | any> {
    const { email, username, password, firstName, lastName } = credentials;
    const user = await this.validateUserReg(username, email, password);
    if (user) {
      return {
        message: "người dùng với email hoặc username tương tự đã tồn tại",
        statusCode: 409,
      };
    }
    const userCreated = await this.userService.createUser({
      data: {
        email,
        username,
        password,
        firstName,
        lastName,
        roles: ["User"],
      },
    });
    const accessToken = await this.tokenService.createToken({
      id: userCreated.id,
      email,
      password,
    });
    return {
      accessToken,
      id: userCreated.id,
      username,
      roles: (userCreated.roles as { roles: string[] }).roles,
      email: userCreated.email,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      userImage: userCreated.userImage,
    };
  }
  async me(authorization: string = ""): Promise<User> {
    const bearer = authorization.replace("Bearer ", "");
    const { email } = await this.tokenService.decodeToken(bearer);
    const result = await this.userService.user({
      where: { email },
      select: {
        id: true,
        username: true,
        roles: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        userImage: true,
      },
    });
    return result as User;
  }
  async logout(): Promise<void> {
    return;
  }
}
