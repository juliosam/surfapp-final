//import HomeRoute from "@/app/page";
import Counter from "@/components/Counter";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

test("it renders a counter", () => {
  render(<Counter />);
  const count = screen.getByTestId("count");
  expect(count).toHaveTextContent("Count: 0");
});

test("it increments the counter", () => {
  render(<Counter />);
  const button = screen.getByText("Increment");
  fireEvent.click(button);
  const count = screen.getByTestId("count");
  expect(count).toHaveTextContent("Count: 1");
});