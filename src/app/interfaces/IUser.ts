import { GenderEnum } from '../enums';
import { IPost } from './IPost';

export interface IUser {
  id: string;
  picture: string;
  age: number;
  name: string;
  gender: GenderEnum;
  email: string;
  posts: IPost[];
}
