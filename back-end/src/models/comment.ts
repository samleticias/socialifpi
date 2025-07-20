import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    author!: string;

    @Column()
    content!: string;

    @Column()
    date!: Date;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    post!: Post;
}