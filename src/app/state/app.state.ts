import { Link } from '../interfaces/links.model';

export interface AppState {
  links: ReadonlyArray<Link>;
}