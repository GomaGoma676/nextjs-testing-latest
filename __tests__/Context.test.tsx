import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StateProvider } from "../context/StateProvider";
import ContextA from "../components/ContextA";
import ContextB from "../components/ContextB";
import "setimmediate";

describe("Global state management (useContext)", () => {
  it("Should change the toggle state globally", async () => {
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    );
    expect(screen.getByTestId("toggle-a").textContent).toBe("false");
    expect(screen.getByTestId("toggle-b").textContent).toBe("false");
    act(() => {
      userEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByTestId("toggle-a").textContent).toBe("true");
    expect(screen.getByTestId("toggle-b").textContent).toBe("true");
  });
});
