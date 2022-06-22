type TrackInfo = {
  submitter: {
    id: string;
    username: string;
    avatar: string;
  };
  detail: {
    title: string;
    author: string;
    length: number;
    identifier: string;
    isStream: boolean;
    uri: string;
  };
};

export type { TrackInfo };
