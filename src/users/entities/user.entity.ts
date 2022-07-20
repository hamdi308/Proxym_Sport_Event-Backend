import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from 'src/event/entities/event.entity'
@Entity()
export class User {
    table: any;
    toObject(): { [x: string]: any; user_passwrd: any; } {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'collaborater_id'
    })
    collaborater_id: number;
    @Column({ name: 'proxym_id' })
    proxym_id: string;
    @Column({ name: 'user_name', default: '-' })
    user_name: string;
    @Column({ name: 'user_sec_name', default: '-' })
    user_sec_name: string;
    @Column()
    user_passwrd: string;
    @Column({default:false})
    is_admin: boolean;
    @Column({ name: 'user_image', default: '-' })
    image: string;
    @Column()
    user_email: string;
    @Column()
    user_phone: number;
    @ManyToMany(() => Event,(event)=>event.users, { cascade: true })
    @JoinTable({
        name: 'interested_in',
        joinColumn: { name: 'user_id', referencedColumnName: 'collaborater_id' },
        inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
    })
    events_intersted: Event[];
    @ManyToMany(() => Event, (event) => event.users, { cascade: true, eager:true})
    @JoinTable({
        name: 'participants',
        joinColumn: { name: 'user_id', referencedColumnName: 'collaborater_id' },
        inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
    })
    events_participated_in: Event[];
}
