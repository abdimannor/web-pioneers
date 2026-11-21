// English UI strings for the shared scripts (motion.js, script.js, walk.js,
// hypertext.js, packets.js). Loaded before them on the English pages; the
// Swedish defaults live in each script.
window.WP_I18N = {
  motion: {
    label: 'Animations: ', on: 'on', off: 'off', region: 'Animations',
    notice: 'Your device asks for reduced motion, so the animations are paused.',
    play: '▶ Play the animations', keep: 'Keep still',
  },
  script: {
    status: (shown, total) => `${shown} of ${total} events shown.`,
    close: 'Close',
    search: 'Search the glossary',
    terms: (shown, total) => `${shown} of ${total} terms shown.`,
    locale: 'en',
  },
  walk: {
    rail: 'Choose a step', prev: 'Previous', next: 'Next',
    status: (n, total, name) => `Step ${n} of ${total}: ${name}`,
  },
  hypertext: {
    next: 'Links onward:',
    docs: {
      www: { title: 'The WWW proposal', from: ['h2', 'The WWW proposal'] },
      enquire: { from: ['h2', 'Enquire at CERN'] },
      standarder: { title: 'Open standards', from: ['h3', 'Open standards'] },
    },
  },
  packets: {
    sender: 'Sender', receiver: 'Receiver',
    arrived: (n, total) => `Packet ${n} of ${total} has arrived.`,
    order: (order) => `Order of arrival: ${order}. TCP sorts by number.`,
    done: 'All packets have arrived and the message is reassembled.',
    split: (n, size) => `The message is split into ${n} packets of ${size} characters each.`,
  },
};
