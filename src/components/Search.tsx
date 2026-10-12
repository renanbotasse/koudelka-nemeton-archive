import { For, Show, createSignal, onCleanup, onMount } from 'solid-js';

interface Hit { url: string; title: string; excerpt: string }
interface PagefindResult { data: () => Promise<{ url: string; meta: { title?: string }; excerpt: string }> }
interface Pagefind { search: (q: string) => Promise<{ results: PagefindResult[] }> }

/**
 * Site search on top of Pagefind's static index. Nothing loads until the dialog opens,
 * so search costs zero bytes for visitors who never use it. Sealed text is excluded at index time.
 */
export default function Search() {
  let dialog!: HTMLDialogElement;
  let input!: HTMLInputElement;
  const [hits, setHits] = createSignal<Hit[]>([]);
  const [state, setState] = createSignal<'idle' | 'loading' | 'ready' | 'unavailable'>('idle');
  let pf: Pagefind | undefined;
  let seq = 0;

  async function load(): Promise<void> {
    if (pf || state() === 'unavailable') return;
    setState('loading');
    try {
      const path = '/pagefind/pagefind.js';
      pf = (await import(/* @vite-ignore */ path)) as Pagefind;
      setState('ready');
    } catch {
      setState('unavailable'); // dev server: the index only exists after `npm run build`
    }
  }

  function open(): void {
    dialog.showModal();
    input.focus();
    void load();
  }

  async function query(q: string): Promise<void> {
    const mine = ++seq; // drop stale responses when the visitor keeps typing
    if (!pf || q.trim().length < 2) { setHits([]); return; }
    const res = await pf.search(q);
    const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
    if (mine !== seq) return;
    setHits(data.map((d) => ({ url: d.url, title: d.meta.title ?? d.url, excerpt: d.excerpt })));
  }

  onMount(() => {
    // Observes the "/" key so keyboard users can search from anywhere, except while typing.
    const onKey = (e: KeyboardEvent): void => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !dialog.open && !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        open();
      }
    };
    addEventListener('keydown', onKey);
    onCleanup(() => removeEventListener('keydown', onKey));
  });

  return (
    <>
      <button class="ctrl" type="button" aria-haspopup="dialog" aria-label="Search" onClick={open}><span class="long">SEARCH </span><span aria-hidden="true">/</span></button>
      <dialog ref={dialog} class="search" aria-labelledby="search-title" onClick={(e) => { if (e.target === dialog) dialog.close(); }}>
        <div class="search-in">
          <p class="mono" id="search-title">SEARCH THE ARCHIVE</p>
          <label class="mono" for="search-q">Query</label>
          <input id="search-q" ref={input} type="search" autocomplete="off" spellcheck={false} placeholder="Koudelka, nave, 1898…"
            onInput={(e) => void query(e.currentTarget.value)} />
          <p class="mono" role="status" aria-live="polite">
            {state() === 'loading' ? 'RETRIEVING INDEX…' : state() === 'unavailable' ? 'SEARCH WORKS ON THE BUILT SITE ONLY.' : `${hits().length} RESULTS`}
          </p>
          <Show when={hits().length}>
            <ol class="search-hits">
              <For each={hits()}>{(h) => (
                <li>
                  <a href={h.url}>{h.title.replace(' · The Nemeton Archive', '')}</a>
                  {/* Pagefind excerpts are escaped text with <mark> highlights only. */}
                  <p innerHTML={h.excerpt} />
                </li>
              )}</For>
            </ol>
          </Show>
          <button class="chip" type="button" onClick={() => dialog.close()}>Close</button>
        </div>
      </dialog>
    </>
  );
}
