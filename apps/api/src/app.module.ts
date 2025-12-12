import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import other modules

@Module({
  imports: [AuthModule],
})
export class AppModule {}
