import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Books')
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    title: string

    @Column({ type: "varchar" })
    author: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "varchar" })
    genre: string

    @Column({ type: "boolean" })
    isAvailable: boolean

}


