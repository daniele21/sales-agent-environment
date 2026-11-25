import test from 'node:test';
import assert from 'node:assert/strict';
import {STEPS,TOURS,getStep,validProgress,advanceTour} from './src/tour-config.js';
test('all configured chapters exist and have unique ids',()=>{assert.equal(new Set(STEPS.map(s=>s.id)).size,STEPS.length);for(const t of TOURS){assert.ok(t.steps.length);for(let i=0;i<t.steps.length;i++)assert.ok(getStep(t.id,i))}});
test('only the expected action advances a chapter',()=>{const s={id:'full',index:0,revision:0};assert.equal(advanceTour(s,'note-saved'),s);assert.equal(advanceTour(s,'daily-open').index,1)});
test('resume rejects completed, malformed and unknown progress',()=>{assert.ok(validProgress({id:'full',index:0}));for(const p of [null,{}, {id:'full',index:-1},{id:'full',index:100},{id:'unknown',index:0},{id:'full',index:1.5}])assert.equal(validProgress(p),false)});
test('every tour can complete from its own events',()=>{for(const t of TOURS){let s={id:t.id,index:0};for(let i=0;i<t.steps.length;i++)s=advanceTour(s,getStep(t.id,i).event);assert.equal(s.index,t.steps.length);assert.equal(validProgress(s),false)}});
