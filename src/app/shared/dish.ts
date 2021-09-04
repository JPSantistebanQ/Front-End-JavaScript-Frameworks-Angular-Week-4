import { Comment } from "./comment";

export class Dish {
  id: number= 0;
  name: string = '';
  image: string = '';
  category: string = '';
  label: string = '';
  price: string = '';
  description: string = '';
  featured: boolean = false;
  comments: Comment[] = [];
}
