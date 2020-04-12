import * as assert from "assert";
import * as sut from "../subproc";

describe("subproc", function () {
    describe("#runProcess()", function () {
        it("should return Yeah!", function () {
            sut.runProcess("ze input").then((output) => {
                assert.equal(output, "yeah!");
            });
        });
    });
});
