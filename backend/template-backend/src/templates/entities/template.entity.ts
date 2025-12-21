import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("templates")
export class Template {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column('text') name: string;
    @Column('text', { nullable: true }) description?: string;
    @Column('jsonb', { nullable: true }) json: any;


}
