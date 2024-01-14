import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogEntity } from './entity/blog.entity';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  private blogPosts: BlogEntity[] = [];
  private idCounter = 1;
  private findBlogIndex(id: number): number {
    return this.blogPosts.findIndex((post) => post.id === id);
  }

  getAllBlogs(): BlogEntity[] {
    return this.blogPosts;
  }

  getBlogById(id: number): BlogEntity {
    const blogPost = this.blogPosts.find((post) => post.id === id);
    if (!blogPost) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blogPost;
  }

  createBlog(postDto: BlogDto): BlogEntity {
    const newPost = new BlogEntity(
      this.idCounter++,
      postDto.title,
      postDto.content,
    );
    this.blogPosts.push(newPost);
    return newPost;
  }

  updateBlog(id: number, postDto: BlogDto): BlogEntity {
    const index = this.findBlogIndex(id);
    if (index === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    this.blogPosts[index].title = postDto.title;
    this.blogPosts[index].content = postDto.content;
    return this.blogPosts[index];
  }

  deleteBlog(id: number): boolean {
    const index = this.findBlogIndex(id);
    if (index === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    this.blogPosts.splice(index, 1);
    return true;
  }
}
