import * as chai from "chai";
import { suite, test } from "mocha-typescript";

function testFct() {
  return 8;
}

@suite class Hello {
  @test public world() {
    chai.expect(testFct()).to.be.equals(8);
  }
}
