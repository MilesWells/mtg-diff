import { forwardRef } from 'react';
import styles from './LineParseTextarea.module.scss';

type LineParseTextareaProps = Omit<
  React.HTMLProps<HTMLTextAreaElement>,
  'onChange' | 'ref'
> & {
  onLinesParsed: (lines: string[]) => void;
};

export const LineParseTextarea = forwardRef<
  HTMLTextAreaElement,
  LineParseTextareaProps
>(function LineParseTextarea({ onLinesParsed, ...textareaProps }, ref) {
  return (
    <textarea
      className={styles.textarea}
      onChange={(e) => {
        const lines = parseLinesFromValue(e.target.value);
        onLinesParsed(lines);
      }}
      ref={ref}
      {...textareaProps}
    />
  );
});

function parseLinesFromValue(value: string) {
  return value
    .trim()
    .split(/\r\n|\r|\n/)
    .map(parseLine)
    .filter((line) => line.length > 0);
}

const numberedRegex = /^\d /;

function parseLine(line: string) {
  if (!numberedRegex.test(line)) return line.trim();

  return line.replace(numberedRegex, '').trim();
}
