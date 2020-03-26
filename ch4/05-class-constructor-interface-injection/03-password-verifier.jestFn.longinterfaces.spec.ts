import {PasswordVerifier} from "./00-password-verifier";
import {IComplicatedLogger} from "./interfaces/complicated-logger";
import {PasswordVerifier2} from "./00-password-verifier2";
import stringMatching = jasmine.stringMatching;


describe('password verifier with interfaces', () => {
    describe('with a complicated interface, life sucks more', () => {
        class FakeLogger implements IComplicatedLogger {
            debug(text: string, obj: any) {
            }

            error(text: string, location: string, stacktrace: string) {
            }

            info(text: string) {
            }

            warn(text: string) {
            }
        }

        test('verify, with logger, calls logger', () => {
            const mockLog = new FakeLogger();
            mockLog.info = jest.fn();
            // mockLog.error = jest.fn();
            // mockLog.warn = jest.fn();
            // mockLog.debug = jest.fn();

            ///inject the mock..
            const verifier = new PasswordVerifier2([],mockLog);
            verifier.verify('anything');

            expect(mockLog.info)
                .toHaveBeenCalledWith(stringMatching(/PASS/));

        });

        test('verify, with casting', () => {
            const mockLog = {} as IComplicatedLogger;
            mockLog.info = jest.fn();

            const verifier = new PasswordVerifier2([],mockLog);
            verifier.verify('anything');

            expect(mockLog.info)
                .toHaveBeenCalledWith(stringMatching(/PASS/));
        });

    });

});
