import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Comment } from './comment';
import { Report } from './report';
import { Category } from './category';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    date!: Date;

    @Column({ default: 0 })
    likes!: number;

    @Column({ type: 'varchar', nullable: true })
    imagePath?: string | null;

    @ManyToOne(() => Category, category => category.posts)
    category!: Category;

    @OneToMany(() => Comment, comment => comment.post, { cascade: true })
    comments!: Comment[];

    @OneToMany(() => Report, report => report.post, { cascade: true })
    reports!: Report[];
}