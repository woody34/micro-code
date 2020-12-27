import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './code/code.schema';
import { CodeController } from './code/code.controller';
import { CodeService } from './code/code.service';

const mongoUrl = process.env.MONGO_URL ?? 'mongodb://localhost/code';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
  ],
  controllers: [AppController, CodeController],
  providers: [AppService, CodeService],
})
export class AppModule {}
