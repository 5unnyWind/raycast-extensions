import { LaunchOptions } from "raycast-cross-extension";

export interface QoderDirectoryContext {
  ruleContent: string;
  replace?: boolean;
}

export type LaunchContext = {
  qoderDirectory?: Partial<QoderDirectoryContext>;
  callbackLaunchOptions?: LaunchOptions;
};
