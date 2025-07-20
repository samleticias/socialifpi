import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    reason!: string;

    @Column()
    date!: Date;

    @ManyToOne(() => Post, post => post.reports, { onDelete: 'CASCADE' })
    post!: Post;
}