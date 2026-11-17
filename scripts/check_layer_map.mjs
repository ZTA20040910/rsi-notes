import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import { parseHTML } from 'linkedom';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

function setup({ mobile = false, reducedMotion = false, scripts = true } = {}) {
  const { document, window } = parseHTML(html);
  const controls = [...document.querySelectorAll('[data-layer-select]')];
  const panels = [...document.querySelectorAll('[data-layer-panel]')];
  const effects = { focus: null, scroll: [] };
  controls.forEach((control) => { control.focus = () => { effects.focus = control; }; });
  panels.forEach((panel) => { panel.scrollIntoView = (options) => effects.scroll.push({ id: panel.dataset.layerPanel, ...options }); });
  if (scripts) {
    const script = [...document.querySelectorAll('script')].find((node) => node.textContent.includes('[data-layer-explorer]'));
    assert.ok(script, 'Built homepage must include the layer interaction script');
    runInNewContext(script.textContent, {
      document,
      window: { matchMedia: (query) => ({ matches: query.includes('max-width') ? mobile : reducedMotion }) },
    });
  }
  return {
    document, controls, panels, effects,
    control: (id) => controls.find((control) => control.dataset.layerSelect === id),
    dispatch(control, type, properties = {}) {
      const event = new window.Event(type, { bubbles: true, cancelable: true });
      Object.assign(event, properties);
      control.dispatchEvent(event);
      return event;
    },
    selected() {
      const visible = panels.filter((panel) => !panel.hidden);
      assert.equal(visible.length, 1, 'Exactly one explanation must be visible');
      const id = visible[0].dataset.layerPanel;
      const pressed = controls.filter((control) => control.getAttribute('aria-pressed') === 'true');
      assert.equal(pressed.length, 1);
      assert.equal(pressed[0].dataset.layerSelect, id);
      assert.equal(pressed[0].getAttribute('aria-controls'), visible[0].id);
      assert.equal(document.querySelector('.layer-step.is-selected').dataset.layerStep, id);
      assert.equal(document.querySelectorAll('.layer-step.is-selected').length, 1);
      return id;
    },
  };
}

test('six layers and their case links work without JavaScript', () => {
  const page = setup({ scripts: false });
  assert.equal(page.controls.length, 6);
  for (const control of page.controls) {
    assert.equal(control.getAttribute('href'), `/rsi-notes/levels/${control.dataset.layerSelect}/`);
    assert.equal(control.hasAttribute('role'), false);
    const links = control.parentElement.querySelectorAll('.layer-case-strip a');
    assert.ok(links.length > 0);
    for (const link of links) {
      const target = link.getAttribute('href');
      if (target.startsWith('https:')) {
        assert.equal(control.dataset.layerSelect, 'l3');
        assert.equal(target, 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills');
      } else assert.match(target, /^\/rsi-notes\/posts\/.+\/$/);
    }
  }
  assert.equal(page.panels.filter((panel) => !panel.hidden)[0].dataset.layerPanel, 'l2');
});

test('clicking each layer changes the explanation, selected state and deep link', () => {
  const page = setup();
  assert.equal(page.selected(), 'l2');
  for (const control of page.controls) {
    const event = page.dispatch(control, 'click', { detail: 1 });
    assert.equal(event.defaultPrevented, true);
    const id = page.selected();
    assert.equal(id, control.dataset.layerSelect);
    const panel = page.panels.find((panel) => !panel.hidden);
    assert.equal(panel.querySelector('.layer-deep-link').getAttribute('href'), `/rsi-notes/levels/${id}/`);
    assert.ok(panel.querySelectorAll('.layer-reading').length > 0);
  }
  assert.equal(page.effects.scroll.length, 0, 'Desktop selection should keep the page position');
});

test('keyboard selection supports arrows, Home, End, Enter and Space', () => {
  const page = setup();
  for (const [from, key, expected] of [
    ['l2', 'ArrowUp', 'l3'], ['b0', 'ArrowDown', 'l5'],
    ['l5', 'ArrowUp', 'b0'], ['l2', 'Home', 'l5'],
    ['l2', 'End', 'b0'], ['l1', ' ', 'l1'], ['l4', 'Enter', 'l4'],
  ]) {
    assert.equal(page.dispatch(page.control(from), 'keydown', { key }).defaultPrevented, true);
    assert.equal(page.selected(), expected);
    assert.equal(page.effects.focus, page.control(expected));
  }
  assert.equal(page.dispatch(page.control('l2'), 'keydown', { key: 'Tab' }).defaultPrevented, false);
  assert.equal(page.selected(), 'l4');
});

test('modified clicks preserve opening the layer page in another tab', () => {
  const page = setup();
  for (const modifier of ['ctrlKey', 'metaKey', 'shiftKey', 'altKey']) {
    assert.equal(page.dispatch(page.control('l5'), 'click', { [modifier]: true }).defaultPrevented, false);
    assert.equal(page.selected(), 'l2');
  }
});

test('mobile taps reveal the selected explanation and respect reduced motion', () => {
  for (const reducedMotion of [false, true]) {
    const page = setup({ mobile: true, reducedMotion });
    page.dispatch(page.control('l5'), 'click', { detail: 1 });
    assert.equal(page.selected(), 'l5');
    assert.deepEqual(JSON.parse(JSON.stringify(page.effects.scroll)), [{ id: 'l5', block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' }]);
    page.dispatch(page.control('l2'), 'keydown', { key: 'Enter' });
    assert.equal(page.selected(), 'l2');
    assert.equal(page.effects.scroll.length, 1, 'Keyboard interaction should retain focus on the diagram');
  }
});
