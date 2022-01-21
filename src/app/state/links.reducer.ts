import { createReducer, on } from '@ngrx/store';

import { retrievedLinkList, removeLink } from './links.actions';
import { Link } from '../interfaces/links.model';

export const initialState: ReadonlyArray<Link> = [];

export const linksReducer = createReducer(
  initialState,
  on(retrievedLinkList, (state, { links }) => links),
  on(removeLink, (state, { linkId }) => state.filter((id) => id.id !== linkId)),
);