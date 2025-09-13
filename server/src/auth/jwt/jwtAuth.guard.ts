import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log("🔍 JwtAuthGuard::handleRequest");
    console.log("Error:", err);
    console.log("User:", user);
    console.log("Info:", info);

    if (err || !user) {
      throw err || new UnauthorizedException("Unauthorized: Invalid or missing JWT");
    }
    return user;
  }
}