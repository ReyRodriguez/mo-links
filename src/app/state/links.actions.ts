import { createAction, props } from '@ngrx/store';
import { Link } from '../interfaces/links.model';
 
export const addLink = createAction(
  '[Links List] Add Link',
  props<{ link: Link }>()
);
 
export const removeLink = createAction(
  '[Link Collection] Remove Link',
  props<{ linkId: string }>()
);
 
export const retrievedLinkList = createAction(
  '[Link List/API] Retrieve Links Success',
  props<{ links: ReadonlyArray<Link> }>()
);