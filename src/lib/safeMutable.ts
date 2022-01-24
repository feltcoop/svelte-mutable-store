import {writable} from 'svelte/store';

import type {Mutable} from './mutable';

/**
 * Creates a store wrapping a mutable `value`.
 * See the sibling `mutable` store for more docs.
 *
 * Unlike `mutable`, this implementation creates a new object wrapper value on every change.
 * This composes with code that expects immutable references on every store change,
 * but creates a bit of garbage that's sometimes avoidable,
 * and the cases where it's useful are probably pretty rare,
 * because the library's purpose is to mutate the store values,
 * which doesn't compose immutably either.
 * If you don't need to mutate the store value, prefer a normal `writable` store.
 *
 * @param value {any}
 */
export const safeMutable = <T>(value: T): Mutable<T> => {
	const {subscribe, set} = writable({value});
	return {
		subscribe,
		mutate: (mutator) => {
			if (mutator) mutator(value);
			set({value});
		},
		swap: (v) => {
			value = v;
			set({value});
		},
	};
};
