import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
 
  @Column({type:'enum', enum: Role, default: Role.USER})
  role: Role;

  @Column({ nullable: true })
  imageUrl: string;

  @BeforeInsert()
  setDefaultImage() {
    if (!this.imageUrl) {
      this.imageUrl = process.env.DEFAULT_USER_IMAGE_URL;
    }
  }
}
