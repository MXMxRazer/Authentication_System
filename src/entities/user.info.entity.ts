import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User_Auth' })
export class user_auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'test' })
    firstName: string;

    @Column({ default: 'test' })
    @Column()
    lastName: string;

    @Column({ default: 'test' })
    @Column()
    username: string;

    @Column({ default: 'test' })
    @Column()
    email: string;

    @Column({ default: 'test' })
    @Column()
    password: string;

    @CreateDateColumn()
    loginAt: Date;
}
