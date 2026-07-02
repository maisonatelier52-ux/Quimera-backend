import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeaderController } from './header.controller';
import { HeaderService } from './header.service';
import { Header, HeaderSchema } from './header.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Header.name, schema: HeaderSchema }])],
  controllers: [HeaderController],
  providers: [HeaderService],
})
export class HeaderModule {}
