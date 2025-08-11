import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies["accessToken"];
    if (!accessToken) {
      throw new Error("missing token");
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("verification unsuccessful");
    }
    return true;
  }
  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const authHeader = request.headers.authorization;
  //   console.log("authHeader", authHeader);
  //   if (!authHeader) return undefined;
  //   const [type, token] = request.headers.authorization?.split(" ") ?? [];
  //   console.log("token", token);
  //   return type === "Bearer" ? token : undefined;
  // }
}
