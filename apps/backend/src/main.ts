import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: "https://patient-management-system-1xbl.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  });
  const port = parseInt(process.env.PORT, 10) || 8080;
  await app.listen(port, "0.0.0.0");
  console.log(`App is listening on port ${port}`);
}
bootstrap();
