import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { JwtService } from "../jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private readonly reflector: Reflector,
      private readonly jwtService: JwtService,
    ) {
    }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; // 🔓 Permite acceso sin token si la ruta es pública
    }
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verifica el token
      request['user'] = decoded; // Guarda los datos del usuario en la request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1]; // Extrae solo el token
  }
}