const assert = require("assert");

const detect = require("./detect");

describe("QR Code Gen", () => {

  describe("detecting public keys", () => {
    
    it("should detect from a multi-line message with emojis", () => {
      let message1 = `Here we go! 😂
      My public key: 0x048771EB902b6bde6cdad20c31dc70adae72a87178b04cc6a8ef7428f0ae38ad633471098ee7ace7fcad71defc185b4b4df5a5e357f06fa939533d09514bbb3b54 add me guys`;
      const key = detect(message1);
      assert.equal(
        key,
        "0x048771eb902b6bde6cdad20c31dc70adae72a87178b04cc6a8ef7428f0ae38ad633471098ee7ace7fcad71defc185b4b4df5a5e357f06fa939533d09514bbb3b54"
      );
    });

    it("should work if 0x prefix is stripped", () => {
      let message2 = `048771EB902b6bde6cdad20c31dc70adae72a87178b04cc6a8ef7428f0ae38ad633471098ee7ace7fcad71defc185b4b4df5a5e357f06fa939533d09514bbb3b54`;
      const key = detect(message2);
      assert.equal(
        key,
        "0x048771eb902b6bde6cdad20c31dc70adae72a87178b04cc6a8ef7428f0ae38ad633471098ee7ace7fcad71defc185b4b4df5a5e357f06fa939533d09514bbb3b54"
      );
    });

    it("should not detect an incorrect message", () => {
      let message3 = `My public key: 0x08771EB902b6bde6cdad20c31dc70adae72a87178b04cc6a8ef7428f0ae38ad633471098ee7ace7fcad71defc185b4b4df5a5e357f06fa939533d09514bbb3b54 add me guys`;
      const key = detect(message3);
      assert.equal(key, false);
    });
    
  });
});
