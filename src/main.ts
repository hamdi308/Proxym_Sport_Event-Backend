import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder , SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Swagger Test').setDescription('this is the test of swagger api').setVersion('1.0').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' },'acess_token',).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document)
  await app.listen(3000);
}
bootstrap();
