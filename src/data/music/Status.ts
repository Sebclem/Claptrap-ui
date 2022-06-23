import type { Chanel } from "../guild/Channel";
import type { TrackInfo } from "./TrackInfo";

type Status = {
  connected: boolean;
  canView?: boolean;
  connectionStatus?: string;
  canInteract?: boolean;
  channel?: Chanel;
  playBackInfo?: {
    paused: boolean;
    stopped: boolean;
    progress?: number;
    trackInfo?: TrackInfo;
  };
};

export type { Status };
