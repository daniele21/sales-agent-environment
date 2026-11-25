import {cp, mkdir, readFile, rm, writeFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const out=path.join(root,'.pages');
const demo=path.join(out,'demo');
const shell=`<!doctype html>
<html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Pagina non disponibile</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f6fc;color:#302840;font:16px system-ui,sans-serif}main{padding:32px;text-align:center}h1{font-size:22px;font-weight:600}p{color:#6c6677}</style></head><body><main><h1>Pagina non disponibile</h1><p>Non ci sono contenuti pubblici in questa pagina.</p></main></body></html>
`;
await rm(out,{recursive:true,force:true});
await mkdir(demo,{recursive:true});
await cp(dist,demo,{recursive:true});
await writeFile(path.join(out,'index.html'),shell);
await writeFile(path.join(out,'404.html'),shell);
await writeFile(path.join(out,'.nojekyll'),'');
const html=await readFile(path.join(demo,'index.html'),'utf8');
assert.match(html,/<meta name="robots" content="noindex, nofollow"/);
const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]);
assert.ok(refs.some(s=>s.endsWith('.js')),'No JavaScript entry point');
for(const ref of refs){
  assert.ok(ref.startsWith('./assets/'),'Unexpected or absolute asset reference: '+ref);
  await access(path.join(demo,ref));
}
assert.ok(!/href=|location\.|demo\//i.test(shell),'Root must not link or redirect to demo');
console.log('Validated static Pages layout: neutral root + /demo/ + relative assets');
