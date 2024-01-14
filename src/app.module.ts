import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { RequestLoggingMiddleware } from './logger/logger.middleware';

@Module({
  imports: [BlogModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
