import { Category } from "src/categorys/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'event_id'
    })
    id: number;
    @Column({ name: 'event_name' })
    event_name: string;
    @Column({ name: 'event_place' })
    event_place: string;
    @Column({ name: 'event_description'})
    event_description: string;
    @Column({ name: 'event_start_at', type: 'timestamp'})
    event_start_at: Date;
    @Column({ name: 'event_fees' })
    event_fees: number
    @Column({ name: 'event_end_date',type: 'timestamp'})
    event_end_date: Date;
    @Column({ name: 'event_participents_capacity'})
    event_participents_capacity: number;
    @ManyToOne(() => Category, category => category.name)
    @JoinColumn({ name: "category_id"})
    category_id: Category['id'];
    @ManyToMany(() => User, { cascade: true })
    @JoinTable({
        name: 'participants',
        joinColumn: { name: 'event_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'collaborater_id' },
    })
    participants: User[];
    @ManyToMany(() => User, (user) => user.events_intersted)
    @JoinTable({
        name: 'interested_in',
        joinColumn: { name: 'event_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'collaborater_id' },
    })
    users: User[];

}