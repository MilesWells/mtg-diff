import styles from './LineParseTextarea.module.scss';

type LineParseTextareaProps = Omit<
  React.HTMLProps<HTMLTextAreaElement>,
  'onChange'
> & {
  onLinesParsed: (lines: string[]) => void;
};

export function LineParseTextarea({
  onLinesParsed,
  ...textareaProps
}: LineParseTextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      onChange={(e) => {
        const lines = parseLinesFromValue(e.target.value);
        onLinesParsed(lines);
      }}
      {...textareaProps}
    />
  );
}

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
