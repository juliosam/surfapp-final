import { Header } from "@/components/layout/Header";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
//import { LogoProps, LinkProps } from "@/types";

// interface HeaderProps {
//   data: {
//     logo: LogoProps;
//     navigation: LinkProps[];
//     cta: LinkProps;
//   };
// }

test("it renders a header", () => {
  render(<Header data={{ logo: { logoText: "", image: { id: 0, documentId: "", url: "", alternativeText: "" } }, navigation: [], cta: { id: 0, text: "", href: "", isExternal: false } }} />);
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
});

test("it increments the counter", () => {
  render(<Header data={{ logo: { logoText: "", image: { id: 0, documentId: "", url: "", alternativeText: "" } }, navigation: [], cta: { id: 0, text: "", href: "", isExternal: false } }} />);
  const button = screen.getByText("Increment");
  fireEvent.click(button);
  const count = screen.getByTestId("count");
  expect(count).toHaveTextContent("Count: 1");
});