import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Link } from '../interfaces/links.model'
 
export const selectLinks = createFeatureSelector<ReadonlyArray<Link>>('links');
 
;