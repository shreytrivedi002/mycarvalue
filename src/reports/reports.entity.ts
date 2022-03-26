import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class ReportsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  milege: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.reports)
  user: UserEntity;
}
