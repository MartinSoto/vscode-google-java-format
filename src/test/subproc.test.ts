import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sut from "../subproc";

chai.use(chaiAsPromised);
chai.should();

describe("subproc", function () {
    describe("#runCommand()", function () {
        it("should correctly run wc on input", function () {
            return sut
                .runCommand("ze\ninput", "wc", ["-c"])
                .should.eventually.equal("8\n");
        });
    });
});
