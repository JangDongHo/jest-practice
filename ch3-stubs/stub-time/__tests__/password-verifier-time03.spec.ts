import { PasswordVerifier } from "../password-verifier-time03";
import { TimeProviderInterface } from "../time-provider-interface";

const SUNDAY = 0;

class FakeTimeProvider implements TimeProviderInterface {
  fakeDay: number = SUNDAY;

  getDay(): number {
    return this.fakeDay;
  }
}

describe("password verifier with interfaces", () => {
  test("on weekends, throws exceptions", () => {
    const stubTimeProvider = new FakeTimeProvider();
    stubTimeProvider.fakeDay = SUNDAY;
    const verifier = new PasswordVerifier([], stubTimeProvider);

    expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
  });
});
