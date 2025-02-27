export interface UserSettings {
  default: {
    daysToWarn: number;
    daysToAlert: number;
    daysToHighlight: number;
    daysTillExpiration: number;
  };
  public: boolean;
}
