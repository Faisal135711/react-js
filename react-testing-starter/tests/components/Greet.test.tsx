import { render, screen } from "@testing-library/react";

import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with name if name is provided", () => {
    render(<Greet name="Faisal" />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/hello faisal/i);
  });

  it("should render Login button if name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
