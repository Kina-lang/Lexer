import { describe, expect, it } from "vitest";
import { CharacterStream } from "../src";

describe("CharacterStream", () => {
  it("should correctly peek and advance through the character stream", () => {
    const input = "Hello, World!";
    const stream = new CharacterStream(input);

    expect(stream.currentPosition).toBe(0);
    expect(stream.peek()).toBe("H");
    expect(stream.currentPosition).toBe(0);
    expect(stream.advance()).toBe("H"); // H -> e
    expect(stream.currentPosition).toBe(1);
    expect(stream.peek()).toBe("e");
    expect(stream.advance()).toBe("e"); // e -> l
    expect(stream.currentPosition).toBe(2);
    expect(stream.advance()).toBe("l"); // l -> l

    stream.advance(); // l -> o
    stream.advance(); // o -> ,
    stream.advance(); // , ->
    stream.advance(); //   -> W
    stream.advance(); // W -> o
    stream.advance(); // o -> r
    stream.advance(); // r -> l
    stream.advance(); // l -> d
    stream.advance(); // d -> !

    expect(stream.isAtEnd).toBe(false);
    expect(stream.peek()).toBe("!");
    expect(stream.advance()).toBe("!"); // ! -> end
    expect(stream.currentPosition).toBe(input.length);
    expect(stream.isAtEnd).toBe(true);
    expect(stream.peek()).toBe(null);
    expect(stream.advance()).toBe(null);
  });
});
