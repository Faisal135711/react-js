import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "@radix-ui/themes";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();

    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      button: screen.getByRole("combobox"),
      user: userEvent.setup(),
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      onChange,
    };
  };

  it("should render New as the default value", () => {
    const { button } = renderComponent();

    expect(button).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { button, user, getOptions } = renderComponent();
    await user.click(button);

    const options = await getOptions();
    expect(options.length).toBe(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    {
      label: /fulfilled/i,
      value: "fulfilled",
    },
  ])(
    "should render onChange with $value when $label item is selected",
    async ({ label, value }) => {
      const { button, user, onChange, getOption } = renderComponent();
      await user.click(button);

      const option = await getOption(label);
      await user.click(option);
      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it('should call onChange with "new" when New option is selected', async () => {
    const { button, user, onChange, getOption } = renderComponent();
    await user.click(button);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(button);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
