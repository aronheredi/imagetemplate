import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text')
    email: string;

    @Column('text')
    password: string;


    @Column('text')
    name: string;

    @Column('text', { nullable: true })
    avatarUrl?: string;

}