import type { TMetrikaVersion } from './utils';

import { AccountListName } from './constants';
import {
  getCallbackQueueName,
  getTrackerConstructorName,
  getTrackerInstanceName,
  getTrackerVersionName
} from './utils';

declare const Ya: any;

const init = (accounts: number[], options = {}, version: TMetrikaVersion = '1') => {
  const callbackQueue = getCallbackQueueName(version);

  window[AccountListName] ||= [];
  window[AccountListName] = window[AccountListName].concat(accounts);

  window[callbackQueue] ||= [];

  const accountsCallback = () => {
    accounts.forEach((id) => {
      const defaultOptions = { id };

      try {
        const trackerInstanceName = getTrackerInstanceName(id);
        const trackerConstructorName = getTrackerConstructorName(version);
        window[trackerInstanceName] = new Ya[trackerConstructorName](Object.assign(defaultOptions, options));
      } catch (e) {
        console.warn(e);
      }
    });
  }
  window[callbackQueue].push(accountsCallback);

  accounts.forEach((id) => {
    const trackedVersionName = getTrackerVersionName(id);
    window[trackedVersionName] = version;
  });
}

export { init };
