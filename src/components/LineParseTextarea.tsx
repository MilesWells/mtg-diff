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
  return value.split(/\r\n|\r|\n/).filter((line) => line.trim().length > 0);
}
