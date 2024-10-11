import type { Plugin } from "vue";

type IDefinePlugin<T> = T & Plugin;

export function withInstall<T extends { name: string }>(
  plugin: T
): IDefinePlugin<T> {
  const _plugin = plugin as IDefinePlugin<T>;

  _plugin.install = (app) => {
    app.component(_plugin.name, _plugin);
  };

  return _plugin;
}


export const config: { systemId: string | number; baseUrl: string; logOut?: Function | null; [propsName: string | number]: any } = {
  systemId: '',
  baseUrl: '',
  token: '',
  tenantCode: '',
  isEncrypt: true,
}

export const getConfig = () => {
  return { ...config }
}
export const setConfig = (obj: any) => {
  Object.assign(config, obj);
};


