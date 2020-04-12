import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sut from "../subproc";

chai.use(chaiAsPromised);
chai.should();

describe("subproc", function () {
    describe("#runProcess()", function () {
        it("should return Yeah!", function () {
            return sut.runProcess("ze input").should.eventually.equal("Yeah!");
        });
    });
});
