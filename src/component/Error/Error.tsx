import React from 'react';
import cn from 'classnames';
type Props = {
  errorMessege: string;
};

export const Error: React.FC<Props> = ({ errorMessege }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessege !== '',
      })}
    >
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {errorMessege}
    </div>
  );
};
