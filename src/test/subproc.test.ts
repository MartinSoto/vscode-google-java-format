import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sut from "../subproc";

chai.use(chaiAsPromised);
chai.should();

describe("subproc", function () {
    describe("#runCommand()", function () {
        it("should correctly run wc on input", async () => {
            const output = await sut.runCommand("ze\ninput", "wc", ["-c"]);
            output.should.deep.equal([0, "8\n"]);
        });

        it("should return error code of failing command", async () => {
            const output = await sut.runCommand("ze\ninput", "grep", ["xxx"]);
            output.should.deep.equal([1, ""]);
        });

        it("should throw an exception if command not found", () => {
            return sut
                .runCommand("ze\ninput", "kkqq", [])
                .should.eventually.be.rejectedWith();
        });
    });
});
