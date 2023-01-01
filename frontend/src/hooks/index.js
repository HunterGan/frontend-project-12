// @ts-check

import { useContext } from 'react';
import { AuthContext, ActionsContext } from '../contexts/index.js';

export const useActions = () => useContext(ActionsContext);

export const useAuth = () => useContext(AuthContext);
