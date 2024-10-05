import { render, screen } from "@testing-library/react";

import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = { id: 1, name: "Faisal" };

    render(<UserAccount user={user} />);

    const name = screen.getByText(user.name);

    expect(name).toBeInTheDocument();
  });

  it("should render edit button for admin user", () => {
    const user: User = { id: 1, name: "Faisal", isAdmin: true };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button for admin user", () => {
    const user: User = { id: 1, name: "Faisal", isAdmin: false };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});
