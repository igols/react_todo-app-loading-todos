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
      {/* show only one message at a time */}
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
