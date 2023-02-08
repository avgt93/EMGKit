// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  // on(channel: Channels, func: (...args: unknown[]) => void) {
  //   const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
  //     func(...args);
  //   ipcRenderer.on(channel, subscription);

  //   return () => {
  //     ipcRenderer.removeListener(channel, subscription);
  //   };
  // },
  // once(channel: Channels, func: (...args: unknown[]) => void) {
  //   ipcRenderer.once(channel, (_event, ...args) => func(...args));
  // },
  openFile<P extends any[], R extends string[][]>(
    channel: 'dialog:openFile',
    func: (...args: P) => [[]]
  ) {
    return ipcRenderer.invoke(channel) as Promise<R>;
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
