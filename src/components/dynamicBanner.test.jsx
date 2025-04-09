import { render, screen } from "@testing-library/react";
import DynamicBanner from "./dynamicBanner";

test("renders customization heading", () => {
  render(<DynamicBanner />);
  const heading = screen.getByText(/Customize Your Banner/i);
  expect(heading).toBeInTheDocument();
});