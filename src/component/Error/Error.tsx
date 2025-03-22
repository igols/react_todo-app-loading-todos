import React from 'react';
import cn from 'classnames';
type Props = {
  errorMessege: string;
  setError: (value: string) => void;
};

export const Error: React.FC<Props> = ({ errorMessege, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger is-light',
        'has-text-weight-normal',
        { hidden: errorMessege.length === 0 },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      {errorMessege}
    </div>
  );
};
