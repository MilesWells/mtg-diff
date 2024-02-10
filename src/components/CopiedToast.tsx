import clsx from 'clsx';
import styles from './CopiedToast.module.scss';
import { useEffect, useState } from 'react';

type CopiedToastProps = {
  hide: () => void;
  show: boolean;
};

export function CopiedToast({ hide, show }: CopiedToastProps) {
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout>();
  const [hidingTimeout, setHidingTimeout] = useState<NodeJS.Timeout>();
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (show) {
      const toastT = setTimeout(() => {
        setHiding(true);
        hide();

        const hidingT = setTimeout(() => {
          setHiding(false);
        }, 500);
        setHidingTimeout(hidingT);
      }, 1000);

      setToastTimeout(toastT);
    }

    return () => {
      clearTimeout(toastTimeout);
      clearTimeout(hidingTimeout);
    };
  }, [hide, show]);

  return (
    <div
      className={clsx(styles.toast, {
        [styles.hiding]: hiding,
        [styles.show]: show,
      })}
    >
      Copied!
    </div>
  );
}
