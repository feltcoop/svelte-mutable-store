import {type Gen} from '@feltcoop/gro';
import Prism from 'prismjs';

const data = {
	ADef: `const writableMap = writable(new Map(data));`,
	ARead: `$writableMap.get('a')`,
	AWrite: `$writableMap.set('a', $writableMap.get('a') + 1);
$writableMap = $writableMap;`,
	BDef: `const writableMapCloned = writable(new Map(data));`,
	BRead: `$writableMapCloned.get('a')`,
	BWrite: `$writableMapCloned.set('a', $writableMapCloned.get('a') + 1);
$writableMapCloned = new Map($writableMapCloned);`,
	CDef: `const derivedWritableMap = derived(writableMap, ($v) => ({value: $v}));`,
	CRead: `$derivedWritableMap.value.get('a')`,
	CWrite: `$writableMap.set('a', $writableMap.get('a') + 1);
$writableMap = $writableMap;`,
	DDef: `const mutableMap = mutable(new Map(data));`,
	DRead: `$mutableMap.value.get('a')`,
	DWrite: `mutableMap.mutate(($v) => {
	$v.set('a', $v.get('a') + 1);
});`,
	EDef: `const safeMutableMap = safeMutable(new Map(data));`,
	ERead: `$safeMutableMap.value.get('a')`,
	EWrite: `safeMutableMap.mutate(($v) => {
	$v.set('a', $v.get('a') + 1);
});`,
	FDef: `const mutableMapManual = mutable(new Map(data));`,
	FRead: `$mutableMapManual.value.get('a')`,
	FWrite: `$mutableMapManual.value.set('a', $mutableMapManual.value.get('a') + 1);
mutableMapManual.mutate();`,
	GDef: `const mutableMapSwap = mutable(new Map(data));`,
	GRead: `$mutableMapSwap.value.get('a')`,
	GWrite: `const nextRef = new Map($mutableMapSwap.value);
nextRef.set('a', nextRef.get('a') + 1);
mutableMapSwap.swap(nextRef);`,
};

export const gen: Gen = async () => {
	return `
{
  ${Object.entries(data)
		.map(
			([key, value]) =>
				`${JSON.stringify(key)}: ${JSON.stringify(
					Prism.highlight(value, Prism.languages.javascript, 'javascript'),
				)}`,
		)
		.join(',')}
}
`.trim();
};
