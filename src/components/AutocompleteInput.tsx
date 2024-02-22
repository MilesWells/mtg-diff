import {
  useFloating,
  useClick,
  useInteractions,
  useDismiss,
  autoUpdate,
} from '@floating-ui/react';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './AutocompleteInput.module.scss';

export type AutocompleteInputProps = {
  items: string[];
  onSelect: (selected: string) => void;
};

export function AutocompleteInput({ items, onSelect }: AutocompleteInputProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<number>(0);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, {
    toggle: false,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const renderItems = useMemo(() => {
    const filtered =
      input.length <= 2
        ? items
        : items.filter((item) =>
            item.toLowerCase().includes(input.toLowerCase()),
          );

    const sorted = filtered.toSorted();

    return sorted;
  }, [input, items]);

  useEffect(() => {
    setActive(0);
  }, [input]);

  useEffect(() => {
    function keyboardEvents(e: KeyboardEvent) {
      if (e.key === 'ArrowDown')
        setActive((cur) => (cur < renderItems.length ? cur + 1 : 0));
      else if (e.key === 'ArrowUp') setActive((cur) => (cur > 0 ? cur - 1 : 0));
      else if (e.key === 'Enter') onSelect(renderItems[active]);
    }

    window.addEventListener('keydown', keyboardEvents);

    return () => window.removeEventListener('keydown', keyboardEvents);
  }, [active, renderItems]);

  return (
    <>
      <input
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
        ref={refs.setReference}
        {...getReferenceProps()}
      />

      {isOpen && (
        <div
          className={styles.floating}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {renderItems.map((item, idx) => (
            <div
              key={item}
              className={clsx({ [styles.active]: idx === active })}
              onMouseOver={() => setActive(idx)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
