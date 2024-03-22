'use strict';

import type { PropsWithChildren } from 'react';

import React, { useEffect } from 'react';
import { init } from './init';
import { getScriptPath } from './utils';
import { AccountListName } from './constants';

type TYandexMetrikaProps = PropsWithChildren & {
  accounts: number[];
  options?: Record<string, any>;
  version?: '1' | '2';
  scriptAttributes?: Record<string, string>;
};

function YandexMetrika({
  accounts,
  options = {},
  version = '1',
  scriptAttributes = {},
  children,
}: TYandexMetrikaProps) {
  useEffect(() => {
    if (Array.isArray(window[AccountListName]) && window[AccountListName].length > 0) {
      return;
    }

    init(accounts, options, version);

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    scriptElement.src = getScriptPath(version);

    const scriptElementProto = Object.getPrototypeOf(scriptElement);
    Object.keys(scriptAttributes).map((key) => {
      if (scriptElementProto.hasOwnProperty(key)) {
        scriptElement.setAttribute(key, scriptAttributes[key]);
      }
    });

    this.insertPoint.insertBefore(scriptElement, null);
  }, []);

  return <>{ children }</>;
}

export { YandexMetrika };
