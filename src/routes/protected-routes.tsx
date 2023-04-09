import React, { ReactElement, useEffect } from 'react';
import { getSession } from 'utils/session';
import { Session } from 'types/common';
import { Navigate } from 'react-router-dom';
import { paths } from './routes';
import { useDispatch } from 'react-redux';
import { refresh } from 'redux/auth/actions';
import { AppDispatch } from 'types/redux';

interface Props {
  children: ReactElement;
}

function ProtectedRoute({ children }: Props) {
  const session: Session = getSession();
  if (!session || !session.accessToken) {
    return <Navigate to={paths.signin} />;
  }

  return children;
}

export default ProtectedRoute;
