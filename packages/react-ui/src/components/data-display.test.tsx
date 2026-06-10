import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { List, ListItem } from "./list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Typography } from "./typography";

describe("data display", () => {
  it("renders typography variants", () => {
    render(
      <div>
        <Typography variant="h1">标题</Typography>
        <Typography variant="muted">辅助说明</Typography>
        <Typography variant="code">npm run dev</Typography>
      </div>,
    );

    expect(screen.getByRole("heading", { name: "标题", level: 1 })).toHaveClass(
      "text-3xl",
    );
    expect(screen.getByText("辅助说明")).toHaveClass("text-muted-foreground");
    expect(screen.getByText("npm run dev")).toHaveClass("font-mono");
  });

  it("renders list items", () => {
    render(
      <List>
        <ListItem title="Select" description="下拉选择" />
      </List>,
    );

    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("下拉选择")).toBeInTheDocument();
  });

  it("renders table structure", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>组件</TableHead>
            <TableHead>状态</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell>可用</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "组件" })).toHaveClass("h-10");
    expect(screen.getByRole("cell", { name: "可用" })).toBeInTheDocument();
  });
});
