import React from "react";
import { render, waitFor } from "@testing-library/react";
import MyComponent from "./MyComponent";

// Mock useQuery
jest.mock("react-query", () => ({
  useQuery: jest.fn(() => ({
    data: { name: "John Doe", email: "john@example.com" },
    isLoading: false,
    isError: false,
  })),
}));

test("renders user data correctly", async () => {
  const { getByText } = render(<MyComponent />);

  // Wait for the component to finish loading
  await waitFor(() => {
    expect(getByText("User Data")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("john@example.com")).toBeInTheDocument();
  });
});

// Test for loading state
test("renders loading state", () => {
  // Mock useQuery to return loading state
  jest.spyOn(require("react-query"), "useQuery").mockImplementationOnce(() => ({
    data: undefined,
    isLoading: true,
    isError: false,
  }));

  const { getByText } = render(<MyComponent />);
  expect(getByText("Loading...")).toBeInTheDocument();
});

// Test for error state
test("renders error state", () => {
  // Mock useQuery to return error state
  jest.spyOn(require("react-query"), "useQuery").mockImplementationOnce(() => ({
    data: undefined,
    isLoading: false,
    isError: true,
  }));

  const { getByText } = render(<MyComponent />);
  expect(getByText("Error fetching data")).toBeInTheDocument();
});
