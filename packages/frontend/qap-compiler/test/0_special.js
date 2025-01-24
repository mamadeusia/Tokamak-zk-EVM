const chai = require("chai")
const path = require("path")
const F1Field = require("ffjavascript").F1Field
const Scalar = require("ffjavascript").Scalar
const CURVE_NAME = "bls12381"
exports.p = Scalar.fromString("52435875175126190479447740508185965837690552500527637822603658699938581184513") // bn128
const Fr = new F1Field(exports.p)
const wasm_tester = require("circom_tester").wasm
const assert = chai.assert


describe("0x20 SHA3 test", function ()  {
  let circuit;
  let witness;
  before( async () => {
    circuit = await wasm_tester(
      path.join(__dirname, "circuits", "sha3_test.circom"),
      {
        prime: CURVE_NAME
      }
    )
  })
  it("Should equal to each input and output array element", async() => {
    const input = 10
    witness = await circuit.calculateWitness({"in": input}, true)
    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)))
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)))
  })
})