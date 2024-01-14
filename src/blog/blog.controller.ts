import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogEntity } from './entity/blog.entity';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from 'src/authGuard/auth.guard';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogPostService: BlogService) {}

  @Get()
  getAllPosts(): BlogEntity[] {
    return this.blogPostService.getAllBlogs();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): BlogEntity {
    return this.blogPostService.getBlogById(id);
  }

  @Post()
  createPost(@Body(new ValidationPipe()) postDto: BlogDto): BlogEntity {
    return this.blogPostService.createBlog(postDto);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) postDto: BlogDto,
  ): BlogEntity {
    return this.blogPostService.updateBlog(id, postDto);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number): {
    success: boolean;
  } {
    const success = this.blogPostService.deleteBlog(id);
    return { success };
  }
}
