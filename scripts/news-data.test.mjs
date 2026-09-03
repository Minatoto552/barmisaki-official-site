import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeNews, filterNews, isNewNews, newsHref } from '../app/news/news-data.ts';

test('drafts and malformed records never appear; published admin records keep their content', () => {
  const items = normalizeNews([
    { id: 'draft', title: 'Secret', published: false },
    { id: 'unknown', title: 'Unconfirmed' },
    null,
    { id: 'old', title: 'Old', published: true, date: '2026-08-01', content: '本文', thumbnailUrl: 'https://example.com/photo.png' },
    { id: 'new', title: 'New', published: true, date: '2026-09-03', content: '新しい本文' },
  ]);
  assert.deepEqual(items.map((item) => item.id), ['new', 'old']);
  assert.equal(items[1].thumbnail, 'https://example.com/photo.png');
  assert.equal(items[1].content, '本文');
  assert.equal(items[1].category, 'INFORMATION');
});

test('empty or deleted Firebase news yields an empty collection; keyed records work', () => {
  assert.deepEqual(normalizeNews(null), []);
  const items = normalizeNews({ 'entry-1': { title: '営業情報', date: '2026-09-03', published: true, category: 'BUSINESS' } });
  assert.equal(items[0].id, 'entry-1');
  assert.equal(items[0].category, 'BUSINESS');
});

test('search and category filters combine without exposing other items', () => {
  const items = normalizeNews([
    { id: '1', title: 'ＶＲＣ イベント', content: '集合時間は22時', published: true, category: 'EVENT' },
    { id: '2', title: '営業のお知らせ', content: '通常営業', published: true, category: 'BUSINESS', isImportant: true },
  ]);
  assert.deepEqual(filterNews(items, 'EVENT', 'vrc').map((item) => item.id), ['1']);
  assert.equal(filterNews(items, 'EVENT', '集合時間').length, 1);
  assert.equal(filterNews(items, 'BUSINESS', '集合時間').length, 0);
  assert.deepEqual(filterNews(items, 'IMPORTANT', '').map((item) => item.id), ['2']);
});

test('NEW badge respects seven days and Japan midnight, and never marks future/invalid dates', () => {
  const midnight = Date.parse('2026-09-03T00:00:00+09:00');
  assert.equal(isNewNews('2026-09-03', midnight), true);
  assert.equal(isNewNews('2026-09-03', midnight + 7 * 86400000), false);
  assert.equal(isNewNews('2026-09-04', midnight), false);
  assert.equal(isNewNews('invalid', midnight), false);
});

test('article links support future admin IDs without requiring a new static route', () => {
  assert.equal(newsHref({ id: 'new /?&記事' }), '/news/article?id=new%20%2F%3F%26%E8%A8%98%E4%BA%8B');
});
