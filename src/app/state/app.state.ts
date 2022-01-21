import { Link } from '../interfaces/links.model';

export interface AppState {
  books: ReadonlyArray<Link>;
}