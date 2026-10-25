import { TimeProviderInterface } from "./time-provider-interface";

const SUNDAY = 0;
const MONDAY = 1;
const SATURDAY = 6;

export class PasswordVerifier {
  private _timeProvider: TimeProviderInterface;

  constructor(rules: any[], timeProvider: TimeProviderInterface) {
    this._timeProvider = timeProvider;
  }

  verify(input: string): string[] {
    if ([SATURDAY, SUNDAY].includes(this._timeProvider.getDay())) {
      throw new Error("It's the weekend!");
    }

    return [];
  }
}
