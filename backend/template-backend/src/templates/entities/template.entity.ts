import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("templates")
export class Template {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column('text') name: string;
    @Column('jsonb') json: any;


}
