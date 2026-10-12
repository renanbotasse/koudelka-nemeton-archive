import { For, createSignal, onCleanup, onMount } from 'solid-js';

interface Card { id: string; name: string; roles: string; summary: string; numeral: string; img: string }

/**
 * A deck of character cards that turns by itself, like the portrait cards in the game's menus.
 * It pauses on hover/focus and has an explicit pause button (auto-advancing content needs one).
 */
export default function Deck(props: { cards: Card[] }) {
  const [i, setI] = createSignal(0);
  const [auto, setAuto] = createSignal(true);
  let hovering = false;
  const n = props.cards.length;
  const go = (d: number): void => { setI((i() + d + n) % n); };

  onMount(() => {
    // Disabled when the visitor asked for less motion, at load or later.
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off';
    if (reduced) setAuto(false);
    const t = window.setInterval(() => { if (auto() && !hovering && !document.hidden) go(1); }, 4500);
    onCleanup(() => clearInterval(t));
  });

  return (
    <section class="deck" aria-roledescription="carousel" aria-label="The three guests"
      onMouseEnter={() => (hovering = true)} onMouseLeave={() => (hovering = false)} onFocusIn={() => (hovering = true)} onFocusOut={() => (hovering = false)}>
      <div class="deck-stage">
        <For each={props.cards}>{(c, k) => (
          <a class="tarot" href={`/people/${c.id}`} data-pos={(k() - i() + n) % n} aria-hidden={k() !== i()} tabindex={k() === i() ? 0 : -1}>
            <span class="tarot-num">{c.numeral}</span>
            <img src={c.img} width="160" height="200" alt="" />
            <span class="tarot-name">{c.name}</span>
            <span class="mono">{c.roles}</span>
          </a>
        )}</For>
      </div>
      <div class="deck-ctrl">
        <button class="chip" type="button" onClick={() => go(-1)} aria-label="Previous card">←</button>
        <button class="chip" type="button" onClick={() => setAuto(!auto())}>{auto() ? 'Pause' : 'Play'}</button>
        <button class="chip" type="button" onClick={() => go(1)} aria-label="Next card">→</button>
      </div>
      <p class="mono" role="status" aria-live="polite">{props.cards[i()]!.name.toUpperCase()} — {i() + 1} OF {n}</p>
    </section>
  );
}
