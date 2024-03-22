type TMetrikaVersion = '1' | '2';

const getCallbackQueueName = (version: TMetrikaVersion): string => {
  switch (version) {
    case '1':
      return 'yandex_metrika_callbacks';
    case '2':
      return 'yandex_metrika_callbacks2';
  }
};

const getScriptPath = (version: TMetrikaVersion): string => {
  switch (version) {
    case '1':
      return 'https://mc.yandex.ru/metrika/watch.js';
    case '2':
      return 'https://mc.yandex.ru/metrika/tag.js';
  }
};

const getTrackerConstructorName = (version: TMetrikaVersion): string => {
  switch (version) {
    case '1':
      return 'Metrika';
    case '2':
      return 'Metrika2';
  }
};

const getTrackerInstanceName = (id: number): string => {
  return `yaCounter${id}`;
};

const getTrackerVersionName = (id: number): string => {
  return `yaCounterVersion${id}`;
};

export type { TMetrikaVersion };
export {
  getCallbackQueueName,
  getScriptPath,
  getTrackerConstructorName,
  getTrackerInstanceName,
  getTrackerVersionName
};
