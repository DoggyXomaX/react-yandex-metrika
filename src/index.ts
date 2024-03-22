import {
  AccountListName,
} from './constants';
import {
  getCallbackQueueName,
  getTrackerInstanceName,
  getTrackerVersionName,
} from './utils';
import { YandexMetrika } from './YandexMetrika';

const ymProxy = (id: number, methodName: string, ...args: any[]) => {
  try {
    const instanceName = getTrackerInstanceName(id);
    window[instanceName][methodName](...args);
  } catch (ex) {
    console.warn(ex);
  }
};

const getAccountIdList = () => {
  return window ? window[AccountListName] : [];
};

const ymAsyncProxy = (ids: number[]) => {
  return (methodName: string, ...args: any[]) => {
    ids.forEach(id => {
      const trackerVersionName = getTrackerVersionName(id);
      const trackerVersion = window[trackerVersionName];
      const callbackQueueName = getCallbackQueueName(trackerVersion);
      const callbackQueue = window[callbackQueueName];
      if (callbackQueue) {
        callbackQueue.push(() => ymProxy(id, methodName, ...args));
      } else {
        ymProxy(id, methodName, ...args);
      }
    });
  };
};

const ym = (methodName: string, ...args: any) => {
  const accountIdList = getAccountIdList();
  return ymAsyncProxy(accountIdList)(methodName, ...args);
};

const withId = (counterId: number) => {
  return withFilter((id) => counterId === id);
};

const withFilter = (f: (id: number) => boolean) => {
  const accountIdList = getAccountIdList()
  return ymAsyncProxy(accountIdList.filter(f));
};

export default ym;
export { YandexMetrika, withId, withFilter };
