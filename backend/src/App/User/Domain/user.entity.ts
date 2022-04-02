import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  email: string

  @Column('text', { nullable: true })
  avatarUrl: string

  @Column('text')
  passwordHash: string

  @Column('text')
  passwordSalt: string

  @Column('timestamptz')
  createdAt: string
}
